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
        },
        activities: {
            [CrudActionsEnums.Index]: `${DASHBOARD_BASE}/activities/${CRUD.index}`,
            [CrudActionsEnums.Create]: `${DASHBOARD_BASE}/activities/${CRUD.create}`,
            [CrudActionsEnums.Show]: (id: string | number) => `${DASHBOARD_BASE}/activities/${id}`,
            [CrudActionsEnums.Edit]: (id: string | number) => `${DASHBOARD_BASE}/activities/${CRUD.edit}/${id}`  
        }
    },

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