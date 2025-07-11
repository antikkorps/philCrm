import type { PaginationType } from "~/types/pagination"

export interface User {
  id: string
  lastName: string
  firstName: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}


export interface Me extends User {
  avatarUrl: string | null
  bio: string | null
  isActive: boolean
  isSuperAdmin: boolean
  jobTitle: string | null
  lastLoginAt: string
  phone: string | null
  role: Role
  roleId: string
  tenantId: string
}

export interface Role {
  id: string
  name: string
  permissions: Record<string, boolean>
  tenantId: string
  createdAt: string
  updatedAt: string
  }

export interface Tenant {
  id: string
  name: string
  domain: string
  createdAt: string
  updatedAt: string
}

export interface UserResource {
  items: User[]
  pagination: PaginationType
}