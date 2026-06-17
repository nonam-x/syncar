/**
 * Common types used across the Syncar application.
 */

// --- Pagination ---

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface CursorPaginationParams {
  cursor?: string;
  limit?: number;
}

// --- Sorting ---

export type SortDirection = "asc" | "desc";

export interface SortParams {
  sortBy?: string;
  sortDirection?: SortDirection;
}

// --- API Response ---

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// --- Date Range ---

export interface DateRange {
  start: Date;
  end: Date;
}

// --- Timestamps ---

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

// --- ID Types ---

export type UserId = string;
export type EmailId = string;
export type CalendarEventId = string;
export type ConversationId = string;
export type MessageId = string;
