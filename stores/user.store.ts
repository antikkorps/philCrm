import { defineStore } from "pinia"
import { UserService } from "~/lib/services/user.service"
import type { User } from "~/lib/types/auth"

interface UpdateUserData {
  name?: string
  email?: string
  avatar?: string
}

interface UserFilters {
  search?: string
  page?: number
  limit?: number
}

interface UserState {
  users: User[]
  currentUser: User | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  isLoading: boolean
  error: string | null
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    users: [],
    currentUser: null,
    pagination: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    hasUsers: (state) => state.users.length > 0,
    hasPagination: (state) => !!state.pagination,
  },

  actions: {
    async fetchUsers(filters: UserFilters = {}) {
      const userService = new UserService()

      this.isLoading = true
      this.error = null

      try {
        const response = await userService.getUsers(filters)

        this.users = response.data
        this.pagination = response.pagination
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Erreur lors de la récupération des utilisateurs"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchUserById(id: string) {
      const userService = new UserService()

      this.isLoading = true
      this.error = null

      try {
        const user = await userService.getUserById(id)
        return user
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Erreur lors de la récupération de l'utilisateur"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateUser(id: string, data: UpdateUserData) {
      const userService = new UserService()

      this.isLoading = true
      this.error = null

      try {
        const updatedUser = await userService.updateUser(id, data)

        // Mise à jour dans la liste des utilisateurs
        const index = this.users.findIndex((user) => user.id === id)
        if (index !== -1) {
          this.users[index] = updatedUser
        }

        // Mise à jour du currentUser si c'est le même utilisateur
        if (this.currentUser?.id === id) {
          this.currentUser = updatedUser
        }

        return updatedUser
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise à jour de l'utilisateur"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async deleteUser(id: string) {
      const userService = new UserService()

      this.isLoading = true
      this.error = null

      try {
        await userService.deleteUser(id)

        // Suppression de la liste des utilisateurs
        this.users = this.users.filter((user) => user.id !== id)
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Erreur lors de la suppression de l'utilisateur"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateProfile(data: UpdateUserData) {
      const userService = new UserService()

      this.isLoading = true
      this.error = null

      try {
        const updatedUser = await userService.updateProfile(data)
        this.currentUser = updatedUser
        return updatedUser
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise à jour du profil"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async changePassword(currentPassword: string, newPassword: string) {
      const userService = new UserService()

      this.isLoading = true
      this.error = null

      try {
        await userService.changePassword(currentPassword, newPassword)
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Erreur lors du changement de mot de passe"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    clearError() {
      this.error = null
    },

    setCurrentUser(user: User) {
      this.currentUser = user
    },
  },
})
