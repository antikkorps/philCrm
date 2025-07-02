import { defineStore } from "pinia"
import { AuthService } from "~/lib/services/auth.service"
import type {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "~/lib/types/auth"

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    // Getters pour accéder facilement à l'état
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    hasError: (state) => !!state.error,
  },

  actions: {
    // Initialisation du store
    async initialize() {
      const authService = new AuthService()
      const token = authService.getStoredToken()

      if (token) {
        this.token = token
        this.isAuthenticated = true

        try {
          // Récupération des informations utilisateur
          const user = await authService.getCurrentUser()
          this.user = user
        } catch {
          // Si la récupération échoue, on déconnecte l'utilisateur
          this.logout()
        }
      }
    },

    // Connexion
    async login(credentials: LoginCredentials) {
      const authService = new AuthService()

      this.isLoading = true
      this.error = null

      try {
        const response = await authService.login(credentials)

        // Vérification de la structure de la réponse
        if (!response || !response.user) {
          throw new Error("Réponse invalide du serveur")
        }

        // Extraction des données
        const user = response.user
        const token = response.token

        if (!user || !token) {
          throw new Error("Données d'authentification manquantes")
        }

        this.user = user
        this.token = token
        this.isAuthenticated = true

        // Sauvegarde du token
        authService.setAuthToken(token)

        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur de connexion"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Inscription
    async register(credentials: RegisterCredentials) {
      const authService = new AuthService()

      this.isLoading = true
      this.error = null

      try {
        const response = await authService.register(credentials)

        // Vérification de la structure de la réponse
        if (!response || !response.user) {
          throw new Error("Réponse invalide du serveur")
        }

        // Extraction des données
        const user = response.user
        const token = response.token

        if (!user || !token) {
          throw new Error("Données d'authentification manquantes")
        }

        this.user = user
        this.token = token
        this.isAuthenticated = true

        // Sauvegarde du token
        authService.setAuthToken(token)

        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur d'inscription"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Déconnexion
    async logout() {
      const authService = new AuthService()

      try {
        await authService.logout()
      } catch (error) {
        console.warn("Logout error:", error)
      } finally {
        // Nettoyage de l'état local
        this.user = null
        this.token = null
        this.isAuthenticated = false
        this.error = null
      }
    },

    // Mise à jour du profil utilisateur
    updateUser(user: User) {
      this.user = user
    },

    // Réinitialisation du mot de passe
    async forgotPassword(email: string) {
      const authService = new AuthService()

      this.isLoading = true
      this.error = null

      try {
        await authService.forgotPassword(email)
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Erreur lors de l'envoi de l'email"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Réinitialisation du mot de passe avec token
    async resetPassword(token: string, password: string) {
      const authService = new AuthService()

      this.isLoading = true
      this.error = null

      try {
        await authService.resetPassword(token, password)
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Erreur lors de la réinitialisation"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Confirmation du mot de passe
    async confirmPassword(token: string, password: string) {
      const authService = new AuthService()

      this.isLoading = true
      this.error = null

      try {
        await authService.confirmPassword(token, password)
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Erreur lors de la confirmation"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Nettoyage des erreurs
    clearError() {
      this.error = null
    },
  },
})
