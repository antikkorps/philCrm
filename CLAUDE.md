# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on `http://localhost:3000`
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run generate` - Generate static site

### Code Quality
- ESLint is configured via `@nuxt/eslint` module
- No dedicated lint script in package.json - use your IDE's ESLint integration or run `npx eslint .`
- TypeScript checking is handled by Nuxt's build process

## Architecture

### Tech Stack
- **Framework**: Nuxt 3 with Vue 3 and TypeScript
- **UI**: Shadcn/ui components with Tailwind CSS v4
- **State Management**: Pinia stores
- **Internationalization**: Vue i18n
- **Data Fetching**: Custom `apiFetch` utility with authentication

### Project Structure

#### Core Directories
- `components/` - Vue components organized by feature
  - `models/` - CRUD components for data models (companies, contacts, activities, users)
  - `ui/` - Shadcn/ui components (buttons, forms, tables, etc.)
  - `forms/` - Form-related components
  - `auth/` - Authentication components
- `pages/` - File-based routing with dashboard layout
- `layouts/` - `auth.vue` and `dashboard.vue` layouts
- `stores/` - Pinia stores for state management
- `utils/` - Utility functions including API client
- `types/` - TypeScript type definitions
- `locales/` - Translation files (fr/en)

#### Configuration
- `configs/` - Application configuration
  - `models.ts` - Dynamic component mapping for CRUD operations
  - `api_routes.ts` - API endpoint definitions with CRUD route generation
  - `columns/` - Table column configurations
  - `filters/` - Filter configurations for data tables
- `enums/` - Enumeration definitions
- `lib/services/` - Service layer for API interactions

### Key Patterns

#### Dynamic Model CRUD
The app uses a dynamic CRUD system:
- Routes: `/dashboard/[model]` with actions like `create`, `edit/[id]`, `[id]` (show)
- Components are dynamically loaded via `configs/models.ts` based on model and action
- API routes are generated via `makeCompleteCrudRoutes()` in `configs/api_routes.ts`

#### API Integration
- Custom `apiFetch` utility in `utils/api.ts` handles authentication and error handling
- Currently uses a hardcoded token (FAKE_TOKEN) for development
- API base URL configurable via `NUXT_PUBLIC_API_BASE_URL` environment variable

#### Data Tables
- Built with `@tanstack/vue-table`
- Column definitions in `configs/columns/`
- Filter configurations in `configs/filters/`
- Reusable `DataTable.vue` component with pagination and filtering

#### Internationalization
- Vue i18n plugin configured in `plugins/i18n.ts`
- Translation files organized by feature in `locales/fr/` and `locales/en/`
- Attribute translations, enums, and UI text are separated into different files

### Models
Current models with CRUD operations:
- `companies` - Full CRUD with custom show page
- `contacts` - Full CRUD 
- `activities` - Full CRUD with additional endpoints (myActivities, getActivitiesByCompany)
- `users` - Components exist but not fully implemented

### Environment Configuration
- `nuxt.config.ts` defines runtime config including API base URL
- Development API defaults to `http://localhost:8000/api`
- Debug mode configurable via `DEBUG` environment variable