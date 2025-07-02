import type { PaginatedResponse } from "~/lib/types/api"
import type { User } from "~/lib/types/auth"
import { BaseService } from "./base.service"

export interface UpdateUserData {
  name?: string
  email?: string
  avatar?: string
}

export interface UserFilters {
  search?: string
  page?: number
  limit?: number
}

export class UserService extends BaseService {
  async getUsers(filters: UserFilters = {}): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams()

    if (filters.search) params.append("search", filters.search)
    if (filters.page) params.append("page", filters.page.toString())
    if (filters.limit) params.append("limit", filters.limit.toString())

    const queryString = params.toString()
    const endpoint = `/users${queryString ? `?${queryString}` : ""}`

    const response = await this.get<PaginatedResponse<User>>(endpoint)
    return response.data
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.get<User>(`/users/${id}`)
    return response.data
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await this.put<User>(`/users/${id}`, data)
    return response.data
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(`/users/${id}`)
  }

  async updateProfile(data: UpdateUserData): Promise<User> {
    const response = await this.put<User>("/users/profile", data)
    return response.data
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.post("/users/change-password", {
      currentPassword,
      newPassword,
    })
  }
}
