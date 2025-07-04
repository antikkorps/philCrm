import { CrudActionsEnums } from "~/enums/actions"

const DASHBOARD_BASE = "/dashboard"
const CRUD = {
    index: "",
    create: "create",
    edit: "edit",
    update: "update",
    delete: "delete"
}


export const ROUTES = {
    register: "/register",
    login: "/login",
    dashboard: {
        index: DASHBOARD_BASE,
        settings: `${DASHBOARD_BASE}/settings`,
        users: {
            [CrudActionsEnums.Index]: `${DASHBOARD_BASE}/users/${CRUD.index}`,
            [CrudActionsEnums.Create]: `${DASHBOARD_BASE}/users/${CRUD.create}`,
            [CrudActionsEnums.Edit]: (id: string | number) => `${DASHBOARD_BASE}/users/${CRUD.edit}/${id}`
        },
        companies: {
            [CrudActionsEnums.Index]: `${DASHBOARD_BASE}/companies/${CRUD.index}`,
            [CrudActionsEnums.Create]: `${DASHBOARD_BASE}/companies/${CRUD.create}`,
            [CrudActionsEnums.Show]: (id: string | number) => `${DASHBOARD_BASE}/companies/${id}`,
            [CrudActionsEnums.Edit]: (id: string | number) => `${DASHBOARD_BASE}/companies/${CRUD.edit}/${id}`
        }
    },

}

const API_BASE = "/api"
export const API_ROUTES = {
    models: {
        companies: {
            [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
                if (!params) return `${API_BASE}/companies`
                const searchParams = new URLSearchParams()
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        searchParams.append(key, value.toString())
                    }
                })
                return `${API_BASE}/companies?${searchParams.toString()}`
            },
            [CrudActionsEnums.Create]: `${API_BASE}/companies`,
            [CrudActionsEnums.Show]: (id: string | number) => `${API_BASE}/companies/${id}`,
            [CrudActionsEnums.Update]: (id: string | number) => `${API_BASE}/companies/${id}`,
            [CrudActionsEnums.Delete]: (id: string | number) => `${API_BASE}/companies/${id}`
        },
        status: {
            [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
                if (!params) return `${API_BASE}/statuses`
                const searchParams = new URLSearchParams()
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        searchParams.append(key, value.toString())
                    }
                })
                return `${API_BASE}/statuses?${searchParams.toString()}`
            },
            [CrudActionsEnums.Show]: (id: string | number) => `${API_BASE}/statuses/${id}`
        },
        tenants: {
            [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
                if (!params) return `${API_BASE}/tenants`
                const searchParams = new URLSearchParams()
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        searchParams.append(key, value.toString())
                    }
                })
                return `${API_BASE}/tenants?${searchParams.toString()}`
            },
            userByTenant: (tenantId: string | number) => `${API_BASE}/users/tenant/${tenantId}`
        }
    },
    auth: {
        me: `${API_BASE}/auth/me`
    }
}


type DashboardEntry = typeof ROUTES.dashboard[keyof typeof ROUTES.dashboard]

export const isCrudEntry = (entry: DashboardEntry): entry is {
    index: string;
    create: string;
    edit: (id: string | number) => string;
} => {
    return typeof entry === 'object' &&
        entry !== null &&
        typeof (entry as any).index === 'string' &&
        typeof (entry as any).create === 'string' &&
        typeof (entry as any).edit === 'function';
}