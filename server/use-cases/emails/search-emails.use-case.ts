import { SearchEmailsSchema } from "@/types/api.types";
import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { SearchService } from "@/server/services/search.service";
import type { Email } from "@/types";

export class SearchEmailsUseCase {
  constructor(private searchService: SearchService) {}

  async execute(
    userId: string,
    input: unknown
  ): Promise<Result<Email[]>> {
    // 1. Validate inputs with Zod
    const validation = SearchEmailsSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for searching emails", {
          errors: validation.error.format(),
        })
      );
    }

    const { query, useVectorSearch, maxResults, labelIds } = validation.data;

    // 2. Call service layer wrapped in Result monad
    return fromPromise(
      this.searchService.search({
        userId,
        query,
        useVectorSearch,
        limit: maxResults,
        labelIds,
      }),
      (error) => {
        console.error("SearchEmailsUseCase failure:", error);
        return error as any;
      }
    );
  }
}
