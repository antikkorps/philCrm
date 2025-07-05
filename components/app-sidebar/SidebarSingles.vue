<template>
    <SidebarGroup>
        <SidebarGroupLabel>{{ title }}</SidebarGroupLabel>
        <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem v-for="item in items" :key="item.title">
                    <SidebarMenuButton v-if="item.isVisible" asChild :isActive="item.url === route.path">
                        <a :href="item.url">
                            <component :is="item.icon" />
                            <span>{{ item.title }}</span>
                        </a>
                    </SidebarMenuButton>

                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>

<script setup lang="ts">
import {
SidebarGroup,
} from '@/components/ui/sidebar'
import type { SidebarNav } from '~/types/sidebar';
const route = useRoute()
defineProps<{
    items: SidebarNav[],
    title: string
}>()
</script>
