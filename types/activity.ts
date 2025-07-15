import type { User } from "~/lib/types/auth"
import type { PaginationType } from "./pagination"

export interface Activity {
    id: string
    type: string // "CALL", "MEETING", "TASK", "EMAIL", "NOTE", etc.
    title: string
    content?: string | null

    // Dates importantes
    startTime?: string | null // ou Date si tu utilises Date côté front
    endTime?: string | null
    dueDate?: string | null

    // Champs spécifiques CALL
    callDirection?: string | null // "INBOUND" | "OUTBOUND"
    duration?: number | null
    callOutcome?: string | null

    // Champs spécifiques MEETING
    location?: string | null
    attendees?: string | null

    // Champs spécifiques TASK
    priority?: string | null // "LOW" | "MEDIUM" | "HIGH"
    taskStatus?: string | null // "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
    progress?: number | null // 0-100

    // Champs spécifiques EMAIL
    emailSubject?: string | null
    emailStatus?: string | null // "DRAFT", "SENT", "OPENED", "CLICKED", "BOUNCED"

    // Relations
    contactId?: string | null
    companyId?: string | null
    createdById: string
    assignedToId?: string | null
    assignedTo?: User;
    tenantId: string

    createdAt: string // ou Date
    updatedAt: string // ou Date
}

export interface ActivityResource {
    items: Activity[],
    pagination: PaginationType
}