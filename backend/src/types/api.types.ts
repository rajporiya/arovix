export interface ApiSuccess<T> {
  success: true
  message: string
  data: T
  meta?: Record<string, unknown>
}

export interface ApiFailure {
  success: false
  message: string
  errors?: unknown[]
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}
