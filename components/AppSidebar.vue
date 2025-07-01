<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Home, Settings } from "lucide-vue-next"
import { ROUTES } from '~/configs/routes';
import { useRoute } from 'vue-router'

const route = useRoute()
const items = [
  {
    title: "Home",
    url: ROUTES.dashboard.index,
    icon: Home,
  },
  {
    title: "Settings",
    url: ROUTES.dashboard.settings,
    icon: Settings,
  },
];


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
                <SidebarMenuButton asChild :isActive="item.url === route.path">
                    <a :href="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
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