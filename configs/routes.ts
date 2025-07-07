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
            index: `${DASHBOARD_BASE}/users/${CRUD.index}`,
            create: `${DASHBOARD_BASE}/users/${CRUD.create}`,
            edit: (id: string | number) => `${DASHBOARD_BASE}/users/${CRUD.edit}/${id}`
        }
    },

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