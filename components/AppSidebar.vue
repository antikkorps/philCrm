<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Home, Settings } from "lucide-vue-next"
import { useRoute } from "vue-router"
import { ROUTES } from "~/configs/routes"

const route = useRoute()
const items = [
  {
    title: "Tableau de bord",
    url: ROUTES.dashboard.index,
    icon: Home,
  },
  {
    title: "Paramètres",
    url: ROUTES.dashboard.settings,
    icon: Settings,
  },
]
</script>

<template>
  <Sidebar variant="floating">
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child :is-active="item.url === route.path">
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>
