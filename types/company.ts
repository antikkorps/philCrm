import type { User } from "~/lib/types/auth"
import type { PaginationType } from "./pagination"
import type { Status } from "./status"
import type { Contact } from "./contact"

export interface Company {
    id: string
    client_number?: string
    name: string
    description?: string
    website?: string
    client_group?: string // Pour l'instant non utilisé
    industry?: string // Pour l'instant non utilisé
    address?: string
    address_complement?: string
    city?: string
    zipCode?: string
    code_regional?: string // Pour l'instant non utilisé
    country?: string
    size?: string // Pour l'instant non utilisé / Enum ?
    globalRevenue?: number
    status: Status
    statusId: string // Pour l'instant non utilisé
    assignedToId?: string // Pour l'instant non utilisé
    assignedTo?: User
    tenantId: string // Pour l'instant non utilisé
    createdAt: Date
    updatedAt: Date
}

// extend Company for CompanyShow
export interface CompanyShow extends Company {
    Contacts: Contact[]
    Specialities: Speciality[]
}
export interface CompanyResource {
    items: Company[],
    pagination: PaginationType
}


export interface Speciality {
    id: string;
    name: string;
    createdAt: string; 
    updatedAt: string;
}