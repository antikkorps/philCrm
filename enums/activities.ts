export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export enum ActivityType {
    CALL = "CALL",
    MEETING = "MEETING",
    TASK = "TASK",
    EMAIL = "EMAIL",
    NOTE = "NOTE"
    // Ajoute d'autres types si besoin
}

export function getTaskStatusColor(status: TaskStatus) {
    switch (status) {
        case TaskStatus.PENDING:
            return '#fbbf24'
        case TaskStatus.IN_PROGRESS:
            return '#3b82f6'
        case TaskStatus.COMPLETED:
            return '#22c55e'
        case TaskStatus.CANCELLED:
            return '#ef4444'
        default:
            return '#6b7280'
    }
}

export function getPriorityColor(priority: Priority) {
    switch (priority) {
        case Priority.LOW:
            return 'green'
        case Priority.MEDIUM:
            return 'blue'
        case Priority.HIGH:
            return 'red'
        default:
            return '#000'
    }
}