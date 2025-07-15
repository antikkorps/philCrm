import type { PaginationType } from "./pagination"

export interface Reminder {
    id: string
    title: string
    description?: string | null
    dueDate: string
    isCompleted: boolean
    priority: "LOW" | "MEDIUM" | "HIGH"
    contactId?: string | null
    companyId?: string | null
    createdById: string
    assignedToId: string
    tenantId: string
    createdAt: string
    updatedAt: string
}

export interface ReminderResource {
    items: Reminder[],
    pagination: PaginationType
}
