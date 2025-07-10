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
        },
        contacts: {
            [CrudActionsEnums.Index]: `${DASHBOARD_BASE}/contacts/${CRUD.index}`,
            [CrudActionsEnums.Create]: `${DASHBOARD_BASE}/contacts/${CRUD.create}`,
            [CrudActionsEnums.Show]: (id: string | number) => `${DASHBOARD_BASE}/contacts/${id}`,
            [CrudActionsEnums.Edit]: (id: string | number) => `${DASHBOARD_BASE}/contacts/${CRUD.edit}/${id}`
        }
    },

}




const API_BASE = "/api";
const apiModels: Record<string, any> = {};
const COMPLETE_CRUD_MODELS = ['companies', 'contacts', 'statuses'] as const;
/**
 * Make complete crud routes for a given model
 * @param model - The model to make complete crud routes for
 * @returns The complete crud routes for the given model
 */
function makeCompleteCrudRoutes(model: string) {
    return {
        [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
            if (!params) return `${API_BASE}/${model}`;
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, value.toString());
                }
            });
            return `${API_BASE}/${model}?${searchParams.toString()}`;
        },
        [CrudActionsEnums.Create]: `${API_BASE}/${model}`,
        [CrudActionsEnums.Show]: (id: string | number) => `${API_BASE}/${model}/${id}`,
        [CrudActionsEnums.Update]: (id: string | number) => `${API_BASE}/${model}/${id}`,
        [CrudActionsEnums.Delete]: (id: string | number) => `${API_BASE}/${model}/${id}`,
    };
}
COMPLETE_CRUD_MODELS.forEach(model => {
    apiModels[model] = makeCompleteCrudRoutes(model);
});

/** Add custom manually routes for api routes */
apiModels.status = {
    [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
        if (!params) return `${API_BASE}/statuses`;
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString());
            }
        });
        return `${API_BASE}/statuses?${searchParams.toString()}`;
    },
    [CrudActionsEnums.Show]: (id: string | number) => `${API_BASE}/statuses/${id}`,
};
apiModels.tenants = {
    [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
        if (!params) return `${API_BASE}/tenants`;
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString());
            }
        });
        return `${API_BASE}/tenants?${searchParams.toString()}`;
    },
    userByTenant: (tenantId: string | number) => `${API_BASE}/users/tenant/${tenantId}`,
};
export const API_ROUTES = {
    models: apiModels,
    auth: {
        me: `${API_BASE}/auth/me`
    }
}




type DashboardEntry = typeof ROUTES.dashboard[keyof typeof ROUTES.dashboard]
/**
 * Check if a dashboard entry is a crud entry
 * @param entry - The dashboard entry to check
 * @returns True if the entry is a crud entry, false otherwise
 */
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