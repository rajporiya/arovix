export type AdminRole = 'admin' | 'editor'

export interface AuthUser {
  id: string
  email: string
  role: AdminRole
}
