/**
 * Custom error classes for Syncar application.
 * Each error maps to a specific HTTP status code for clean API responses.
 */

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "EXTERNAL_SERVICE_ERROR"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode: number,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    // Maintains proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details && { details: this.details }),
      },
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "VALIDATION_ERROR", 400, details);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, "NOT_FOUND", 404, { resource, identifier });
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "CONFLICT", 409, details);
    this.name = "ConflictError";
  }
}

export class RateLimitedError extends AppError {
  constructor(retryAfterSeconds?: number) {
    super("Rate limit exceeded. Please try again later.", "RATE_LIMITED", 429, {
      retryAfterSeconds,
    });
    this.name = "RateLimitedError";
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, originalError?: unknown) {
    const originalMessage = originalError instanceof Error ? originalError.message : String(originalError || "");
    const message = `External service '${service}' error: ${originalMessage}`;
    const details: Record<string, unknown> = { service };
    if (originalError instanceof Error) {
      details.originalMessage = originalError.message;
      if (originalError.stack) {
        details.stack = originalError.stack;
      }
    }
    super(message, "EXTERNAL_SERVICE_ERROR", 502, details);
    this.name = "ExternalServiceError";
  }
}

/**
 * Type guard to check if an unknown error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Converts any error to an AppError for consistent API responses.
 * Unknown errors become 500 Internal Server Errors.
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, "INTERNAL_ERROR", 500);
  }

  return new AppError(
    "An unexpected error occurred",
    "INTERNAL_ERROR",
    500
  );
}

/**
 * Creates a standardized error Response for API route handlers.
 */
export function errorResponse(error: unknown): Response {
  const appError = toAppError(error);

  return Response.json(appError.toJSON(), {
    status: appError.statusCode,
  });
}
