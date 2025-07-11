<script setup lang="ts">
import { EyeIcon, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { API_ROUTES, ROUTES } from '~/configs/routes';
import { getDashboardEdit, getDashboardShow } from '~/utils/dashboardModelRoutes';
import AlertModal from '~/components/ui/AlertModal.vue';
import { toast } from 'vue-sonner';
import { ApiError } from '~/utils/api';
const router = useRouter();
// FIXME: adapter les props et tout
const props = defineProps<{
  model: string;
  id: string;
}>()

const showAlert = ref(false)
async function onDelete() {
  const modelApi = API_ROUTES.models[props.model as keyof typeof API_ROUTES.models];
  if (!('delete' in modelApi) || typeof modelApi.delete !== 'function') {
    toast.error('Suppression non supportée pour ce modèle.');
    showAlert.value = false;
    return;
  }
  try {
    await apiFetch(modelApi.delete(props.id), { method: 'DELETE' })
    toast.success('Succeed', {
      description: 'L\'entreprise a été supprimée avec succès',
    })
    router.push(ROUTES.dashboard.companies.index)
  } catch (err) {
  if (err instanceof ApiError && err.status === 409) {
    toast.info('Conflit', {
      description: err.message, // ← message backend ici
    })
  } else {
    toast.error('Erreur', {
      description: 'Une erreur est survenue lors de la suppression',
    })
  }
} finally {
    showAlert.value = false
  }

}
// TODO: ici il faudra ajouter les actions via enum mais à voir comment faire
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>
        <NuxtLink class="flex items-center gap-2" :to="getDashboardShow(props.model, props.id) || ''">
          <EyeIcon class="w-4 h-4" />
          <span>
            View
          </span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <NuxtLink class="flex items-center gap-2" :to="getDashboardEdit(props.model, props.id) || ''">
          <PencilIcon class="w-4 h-4" />
          <span>
            Edit
          </span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem @click="showAlert = true" class="flex items-center gap-2">

        <TrashIcon class="w-4 h-4" />
        <span>
          Delete
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
    <AlertModal :open="showAlert" title="Êtes-vous sûr ?" description="Cette action est irréversible."
      @update:open="showAlert = $event" @confirm="onDelete" />
  </DropdownMenu>

</template>