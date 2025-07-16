import type { Status, StatusResource } from "~/types/status"
import type { Me, User, UserResource } from "~/lib/types/auth";
import { API_ROUTES } from "../api_routes";
import { ActivityPriority, ActivityType, TaskStatus } from "~/enums/activities";
import { str } from "~/lib/str";
import { useI18n } from "vue-i18n";
import type { Company, CompanyResource } from "~/types/company";
import type { Contact, ContactResource } from "~/types/contact";

export const activitiesFilters = [
    {
        name: 'types',
        type: 'select',
        label: 'attributes.type.name',
        getOptions: async (context?: any) => {
            const t = context?.t || ((x: string) => x)
            return Object.values(ActivityType).map((type) => ({
                value: type,
                label: str(t('enums.activities.type.' + type)).capitalize().value()
            }))
        }
    },
    {
        name: 'priority',
        type: 'select',
        label: 'attributes.priority.name',
        getOptions: async (context?: any) => {
            const t = context?.t || ((x: string) => x)
            return Object.values(ActivityPriority).map((priority) => ({
                value: priority,
                label: str(t('enums.activities.priority.' + priority)).capitalize().value()
            }))
        }
    },
    {
        name: 'taskStatus',
        type: 'multiselect',
        label: 'attributes.taskStatus.name',
        getOptions: async (context?: any) => {
            const t = context?.t || ((x: string) => x)
            return Object.values(TaskStatus).map((taskStatus) => ({
                value: taskStatus,
                label: str(t('enums.activities.taskStatus.' + taskStatus)).capitalize().value()
            }))
        }
    },
    {
        name: 'assignedToIds',
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
        name: 'contactId',
        type: 'select',
        label: 'attributes.contact.name',
        getOptions: async () => {
            const response = await apiFetch(API_ROUTES.models.contacts.index({ limit: -1 })) as ContactResource
            const contacts = response.items
            return contacts.map((cat: Contact) => ({
                value: cat.id,
                label: cat.firstName + ' ' + cat.lastName
            }))
        }
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
    // {
    //     name: 'progress',
    //     minName: "progressMin",
    //     maxName: "progressMax",
    //     type: 'range',
    //     min: 0,
    //     max: 100,
    //     step: 25,
    //     label: 'attributes.progress.name',
    //     devise: '%'
    // },
]








// createdAt (via startDate, endDate)
// status
// callOutcome
// emailStatus
// createdById (via createdBy)
// progress, progressMin, progressMax (uniquement pour les tâches)