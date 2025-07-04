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
const route = useRoute()
// TODO: ajouter la condition isVisible, pour l'instant en dur mais qui servira pour les permissions
const items = {
  application: [
    {
      title: "Tableau de bord",
      url: ROUTES.dashboard.index,
      icon: Home,
      isVisible: true
    },
    {
      title: "Paramètres",
      url: ROUTES.dashboard.settings,
      icon: Settings,
      isVisible: true
    }
  ],
  models: [
    {
      title: "Utilisateurs",
      url: "#",
      icon: Users,
      isActive: route.path.startsWith(ROUTES.dashboard.users.index),
      isVisible: true,
      items: [
        {
          title: 'Liste',
          url: ROUTES.dashboard.users.index,
          isVisible: true
        },
        {
          title: 'Créer',
          url: ROUTES.dashboard.users.create,
          isVisible: true
        },  
      ],
    }, {
      title: "Company",
      url: "#",
      icon: Building,
      isActive: route.path.startsWith(ROUTES.dashboard.companies.index),
      isVisible: true,
      items: [
        {
          title: "Liste",
          url: ROUTES.dashboard.companies.index,
          isVisible: true
        },
        {
          title: "Créer",
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