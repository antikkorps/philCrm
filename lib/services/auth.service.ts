import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "~/lib/types/auth"
import { BaseService } from "./base.service"

export class AuthService extends BaseService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>("/auth/login", credentials, false)
    // Si response.data n'existe pas, on retourne la réponse complète
    return response.data || response
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>("/auth/register", credentials, false)
    // Si response.data n'existe pas, on retourne la réponse complète
    return response.data || response
  }

  async logout(): Promise<void> {
    try {
      await this.post("/auth/logout", undefined, false)
    } catch (error) {
      // Même si la requête échoue, on supprime le token local
      console.warn("Logout request failed, but clearing local token:", error)
    } finally {
      this.clearAuthToken()
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.get<User>("/auth/me", false)
    return response.data
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>("/auth/refresh", undefined, false)
    return response.data
  }

  async forgotPassword(email: string): Promise<void> {
    await this.post("/auth/forgot-password", { email }, false)
  }

  async resetPassword(token: string, password: string): Promise<void> {
    await this.post("/auth/reset-password", { token, password }, false)
  }

  async confirmPassword(token: string, password: string): Promise<void> {
    await this.post("/auth/confirm-password", { token, password }, false)
  }

  // Méthodes utilitaires pour la gestion des tokens
  setAuthToken(token: string): void {
    if (import.meta.client) {
      localStorage.setItem("auth_token", token)
    }
  }

  clearAuthToken(): void {
    if (import.meta.client) {
      localStorage.removeItem("auth_token")
    }
  }

  // Méthode publique pour accéder au token
  getStoredToken(): string | null {
    return this.getAuthToken()
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken()
  }
}
