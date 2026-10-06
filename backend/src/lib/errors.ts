export class AppError extends Error { constructor(public status: number, public code: string, message: string) { super(message); } }
export class NotFoundError extends AppError { constructor(what = "Resource") { super(404, "NOT_FOUND", `${what} not found`); } }
export class UnauthorizedError extends AppError { constructor(message = "Please log in") { super(401, "UNAUTHENTICATED", message); } }
export class ConflictError extends AppError { constructor(code: string, message: string) { super(409, code, message); } }
export class UnprocessableError extends AppError { constructor(code: string, message: string) { super(422, code, message); } }
