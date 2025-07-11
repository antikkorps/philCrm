import type { PaginationType } from "./pagination"

export type StatusType = "CONTACT" | "COMPANY" | "OPPORTUNITY" | "QUOTES"

export interface Status {
    id: string
    name: string
    type: StatusType
    color?: string
    order: number
    tenantId: string
    createdAt: Date
    updatedAt: Date
}

export interface StatusResource {
    items: Status[],
    pagination: PaginationType

}