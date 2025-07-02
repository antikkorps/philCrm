import type { ApiError, ApiResponse } from "~/lib/types/api"

export class BaseService {
  private baseURL: string
  private apiVersion: string

  constructor() {
    // En développement, on peut utiliser une URL locale
    // En production, cela viendra de la configuration
    this.baseURL = process.env.NUXT_API_BASE_URL || "http://localhost:3030"
    this.apiVersion = "v1"
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useApiVersion: boolean = true
  ): Promise<ApiResponse<T>> {
    const basePath = useApiVersion ? `/api/${this.apiVersion}` : "/api"
    const url = `${this.baseURL}${basePath}${endpoint}`

    // Ajout des headers par défaut
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }

    // Ajout du token d'authentification si disponible
    const token = this.getAuthToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw this.handleError(error)
    }
  }

  protected async get<T>(
    endpoint: string,
    useApiVersion: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" }, useApiVersion)
  }

  protected async post<T>(
    endpoint: string,
    data?: unknown,
    useApiVersion: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      },
      useApiVersion
    )
  }

  protected async put<T>(
    endpoint: string,
    data?: unknown,
    useApiVersion: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      },
      useApiVersion
    )
  }

  protected async delete<T>(
    endpoint: string,
    useApiVersion: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" }, useApiVersion)
  }

  protected async patch<T>(
    endpoint: string,
    data?: unknown,
    useApiVersion: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      },
      useApiVersion
    )
  }

  protected getAuthToken(): string | null {
    // Récupération du token depuis le localStorage ou les cookies
    if (import.meta.client) {
      return localStorage.getItem("auth_token")
    }
    return null
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: "UNKNOWN_ERROR",
      }
    }

    return {
      message: "Une erreur inconnue est survenue",
      code: "UNKNOWN_ERROR",
    }
  }
}
