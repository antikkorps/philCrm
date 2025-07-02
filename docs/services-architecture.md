# Architecture des Services - PhilCRM

## Vue d'ensemble

Cette architecture sépare la logique métier des stores Pinia en utilisant des services dédiés. Cela permet une meilleure organisation du code, une réutilisabilité accrue et une testabilité améliorée.

## Structure

```
lib/
├── types/           # Types TypeScript
│   ├── auth.ts     # Types d'authentification
│   └── api.ts      # Types génériques API
├── services/        # Services métier
│   ├── base.service.ts    # Service de base avec gestion API
│   ├── auth.service.ts    # Service d'authentification
│   └── user.service.ts    # Service de gestion des utilisateurs
└── utils.ts         # Utilitaires

stores/              # Stores Pinia
├── auth.store.ts    # Store d'authentification
└── user.store.ts    # Store de gestion des utilisateurs

plugins/
└── auth.client.ts   # Plugin d'initialisation
```

## Composants

### 1. Service de Base (`BaseService`)

Le service de base fournit :

- Gestion des appels HTTP (GET, POST, PUT, DELETE, PATCH)
- Gestion automatique des headers (Content-Type, Authorization)
- Gestion centralisée des erreurs
- Configuration de l'URL de base de l'API

```typescript
export class BaseService {
  protected async get<T>(endpoint: string): Promise<ApiResponse<T>>
  protected async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>>
  // ... autres méthodes HTTP
}
```

### 2. Services Métier

Chaque service métier étend `BaseService` et implémente la logique spécifique à un domaine :

#### AuthService

- Connexion/Inscription
- Gestion des tokens
- Réinitialisation de mot de passe
- Récupération du profil utilisateur

#### UserService

- CRUD des utilisateurs
- Gestion des profils
- Changement de mot de passe
- Pagination et filtres

### 3. Stores Pinia

Les stores gèrent l'état global et utilisent les services pour les opérations :

#### AuthStore

- État d'authentification (user, token, isAuthenticated)
- Actions de connexion/inscription/déconnexion
- Gestion des erreurs et du loading

#### UserStore

- Liste des utilisateurs
- Pagination
- Actions CRUD
- Gestion des erreurs et du loading

## Utilisation

### Dans un composant

```vue
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store"

const authStore = useAuthStore()

async function handleLogin() {
  try {
    await authStore.login({
      email: "user@example.com",
      password: "password",
    })
    // Redirection après connexion
  } catch (error) {
    // Gestion d'erreur
  }
}
</script>
```

### Créer un nouveau service

1. **Créer les types** dans `lib/types/`
2. **Créer le service** qui étend `BaseService`
3. **Créer le store** qui utilise le service
4. **Utiliser dans les composants**

#### Gestion des versions d'API

- **Services d'authentification** : Utilisent `useApiVersion: false`

  ```typescript
  await this.post("/auth/login", credentials, false)
  ```

- **Services métier** : Utilisent `useApiVersion: true` (par défaut)
  ```typescript
  await this.get("/users") // Utilise automatiquement /api/v1/users
  ```

Exemple pour un service de produits :

```typescript
// lib/services/product.service.ts
export class ProductService extends BaseService {
  async getProducts(): Promise<Product[]> {
    // Utilise automatiquement /api/v1/products
    const response = await this.get<Product[]>("/products")
    return response.data
  }
}

// stores/product.store.ts
export const useProductStore = defineStore("product", {
  state: () => ({ products: [], isLoading: false }),
  actions: {
    async fetchProducts() {
      const service = new ProductService()
      this.products = await service.getProducts()
    },
  },
})
```

## Avantages

1. **Séparation des responsabilités** : Services pour la logique métier, stores pour l'état
2. **Réutilisabilité** : Services peuvent être utilisés par différents stores
3. **Testabilité** : Logique métier isolée et facilement testable
4. **Maintenabilité** : Code organisé et modulaire
5. **Type Safety** : TypeScript pour une meilleure sécurité de type

## Configuration

L'URL de base de l'API est configurée via la variable d'environnement `NUXT_API_BASE_URL` ou par défaut `http://localhost:3001`.

### Structure des endpoints

- **Authentification** : `BASE_URL/api/auth/*` (sans version)

  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `GET /api/auth/me`
  - etc.

- **API générale** : `BASE_URL/api/v1/*` (avec version)
  - `GET /api/v1/users`
  - `POST /api/v1/users`
  - `PUT /api/v1/users/:id`
  - etc.

## Gestion des erreurs

Les erreurs sont gérées de manière centralisée dans le service de base et propagées vers les stores qui les exposent aux composants.
