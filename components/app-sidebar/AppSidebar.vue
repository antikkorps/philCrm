<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Building, Home, Settings, Users } from "lucide-vue-next"
import { ROUTES } from '~/configs/routes';
import SidebarSingles from '@/components/app-sidebar/SidebarSingles.vue';
import SidebarCollapsibles from '@/components/app-sidebar/SidebarCollapsibles.vue';
import { str } from '~/lib/str';
import { useI18n } from 'vue-i18n';
const route = useRoute()
const { t } = useI18n()
// TODO: ajouter la condition isVisible, pour l'instant en dur mais qui servira pour les permissions
const items = {
  application: [
    {
      title: str(t('sidebar.dashboard')).capitalize().value(),
      url: ROUTES.dashboard.index,
      icon: Home,
      isVisible: true
    },
    {
      title: str(t('sidebar.settings')).capitalize().value(),
      url: ROUTES.dashboard.settings,
      icon: Settings,
      isVisible: true
    }
  ],
  models: [
    {
      title: str(t('sidebar.users')).capitalize().value(),
      url: "#",
      icon: Users,
      isActive: route.path.startsWith(ROUTES.dashboard.users.index),
      isVisible: true,
      items: [
        {
          title: str(t('sidebar.list')).capitalize().value(),
          url: ROUTES.dashboard.users.index,
          isVisible: true
        },
        {
          title: str(t('sidebar.create')).capitalize().value(),
          url: ROUTES.dashboard.users.create,
          isVisible: true
        },  
      ],
    }, {
      title: str(t('sidebar.companies')).capitalize().value(),
      url: "#",
      icon: Building,
      isActive: route.path.startsWith(ROUTES.dashboard.companies.index),
      isVisible: true,
      items: [
        {
          title: str(t('sidebar.list')).capitalize().value(),
          url: ROUTES.dashboard.companies.index,
          isVisible: true
        },
        {
          title: str(t('sidebar.create')).capitalize().value(),
          url: ROUTES.dashboard.companies.create,
          isVisible: true
        }
      ]
    }
  ]
};


</script>

<template>
  <Sidebar variant="floating">
    <SidebarHeader />
    <SidebarContent>
      <SidebarSingles :items="items.application" title="Application" />
      <SidebarCollapsibles v-if="items.models[0].isVisible" :items="items.models" title="Models" />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>