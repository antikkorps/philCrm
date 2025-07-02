import type { LucideIcon } from "lucide-vue-next"

export interface SidebarNav {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    isVisible: boolean
    items?: SidebarNav[]
}
