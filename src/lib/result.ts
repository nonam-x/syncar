/**
 * Result<T, E> — A discriminated union for explicit error handling.
 *
 * Use cases return Result<T, AppError> instead of throwing exceptions.
 * This makes error paths explicit and composable.
 *
 * @example
 * ```ts
 * const result = await listEmailsUseCase.execute(input);
 * if (result.ok) {
 *   return Response.json(result.data);
 * } else {
 *   return errorResponse(result.error);
 * }
 * ```
 */

import type { AppError } from "./errors";

// --- Core Result Type ---

export type Result<T, E = AppError> =
  | { ok: true; data: T }
  | { ok: false; error: E };

// --- Factory Functions ---

/**
 * Creates a successful Result wrapping the given data.
 */
export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

/**
 * Creates a failed Result wrapping the given error.
 */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// --- Utility Functions ---

/**
 * Unwraps a Result, returning the data or throwing the error.
 * Use sparingly — prefer pattern matching with `result.ok`.
 */
export function unwrap<T, E extends Error>(result: Result<T, E>): T {
  if (result.ok) {
    return result.data;
  }
  throw result.error;
}

/**
 * Unwraps a Result, returning the data or a fallback value.
 */
export function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  return result.ok ? result.data : fallback;
}

/**
 * Maps the data of a successful Result.
 */
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => U
): Result<U, E> {
  if (result.ok) {
    return { ok: true, data: fn(result.data) };
  }
  return result;
}

/**
 * Chains a Result-producing function onto a successful Result.
 */
export function flatMap<T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => Result<U, E>
): Result<U, E> {
  if (result.ok) {
    return fn(result.data);
  }
  return result;
}

/**
 * Wraps a promise that may throw into a Result.
 * Useful for wrapping external calls (Corsair, Prisma, etc).
 */
export async function fromPromise<T, E = Error>(
  promise: Promise<T>,
  mapError?: (error: unknown) => E
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { ok: true, data };
  } catch (error) {
    if (mapError) {
      return { ok: false, error: mapError(error) };
    }
    return { ok: false, error: error as E };
  }
}

// --- Paginated Result ---

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Creates a PaginatedData wrapper.
 */
export function paginated<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number
): PaginatedData<T> {
  const totalPages = Math.ceil(total / pageSize);
  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
    hasMore: page < totalPages,
  };
}
