import type { User } from "~/lib/types/auth";
import type { PaginationType } from "./pagination";
import type { Company } from "./company";

export interface Contact {
    id: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    position?: string | null
    statusId: string
    companyId?: string | null,
    company?: Company | null,
    assignedToId?: string | null
    assignedTo?: User | null
    tenantId: string
    createdAt: string
    updatedAt: string
}

export interface ContactResource {
    items: Contact[],
    pagination: PaginationType
}