import type { Status, StatusResource } from "~/types/status"
import type { Me, User, UserResource } from "~/lib/types/auth";
import { API_ROUTES } from "../api_routes";

export const companiesFilters = [
    {
        name: 'name',
        type: 'text',
        label: 'Nom de l\'entreprise'
    },
    {
        name: 'country',
        type: 'text',
        label: 'Pays'
    },
    {
        name: 'industry',
        type: 'text',
        label: 'Industrie'
    },
    {
        name: 'city',
        type: 'text',
        label: 'Ville'
    },
    {
        name: 'country',
        type: 'text',
        label: 'Pays'
    },
    {
        name: 'size',
        type: 'text',
        label: 'Taille'
    },
    {
        name: 'client_number',
        type: 'text',
        label: 'Numéro client'
    },
    {
        name: 'client_group',
        type: 'text',
        label: 'Groupe client'
    },
    {
        name: 'code_regional',
        type: 'text',
        label: 'Code régional'
    },
    {
        name: 'assignedToId',
        type: 'select',
        label: 'attributes.assigned_to.name',
        getOptions: async () => {
            const me = await apiFetch(API_ROUTES.auth.me) as Me;
            const response = await apiFetch(API_ROUTES.models.tenants.userByTenant(me.tenantId)) as UserResource
            const users = response.items.map((user: User) => ({
                value: user.id,
                label: user.firstName
            }))
            return users
        }
    },
    {
        name: 'statusId',
        type: 'select',
        label: 'attributes.status.name',
        getOptions: async () => {
            const response = await apiFetch(API_ROUTES.models.status.index({ limit: -1 })) as StatusResource
            const statuses = response.items
            return statuses.map((cat: Status) => ({
                value: cat.id,
                label: cat.name
            }))
        }
    },
    {
        name: 'created_at',
        type: 'date',
        label: 'Date de création'
    },
    {
        name: 'price',
        minName: "minRevenue",
        maxName: "maxRevenue",
        type: 'range',
        min: 0,
        max: 500000000,
        step: 1000,
        label: 'attributes.globalRevenue.name',
        devise: '€'
    },
]