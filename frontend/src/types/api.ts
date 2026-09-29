export interface ApiError { status: number; message: string }
export interface Paginated<T> { items: T[]; total: number; page: number }
