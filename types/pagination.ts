export interface PaginationType {
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number
}