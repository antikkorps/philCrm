import type { Status, StatusResource } from "~/types/status"
import type { Me, User, UserResource } from "~/lib/types/auth";
import type { Company, CompanyResource } from "~/types/company";
import { API_ROUTES } from "../api_routes";

export const contactsFilters = [
    {
        name: 'firstName',
        type: 'text',
        label: 'Prénom'
    },
    {
        name: 'lastName',
        type: 'text',
        label: 'Nom'
    },
    {
        name: 'email',
        type: 'text',
        label: 'Email'
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Téléphone'
    },
    {
        name: 'position',
        type: 'text',
        label: 'Position'
    },
    {
        name: 'companyId',
        type: 'select',
        label: 'attributes.company.name',
        getOptions: async () => {
            const response = await apiFetch(API_ROUTES.models.companies.index({ limit: -1 })) as CompanyResource
            const companies = response.items
            return companies.map((cat: Company) => ({
                value: cat.id,
                label: cat.name
            }))
        }
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
    }
]