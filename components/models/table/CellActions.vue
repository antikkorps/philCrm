<script setup lang="ts">
import { EyeIcon, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { API_ROUTES, ROUTES } from '~/configs/routes';
import { getDashboardEdit, getDashboardShow } from '~/utils/dashboardModelRoutes';
import AlertModal from '~/components/ui/AlertModal.vue';
import { toast } from 'vue-sonner';
import { ApiError } from '~/utils/api';
import { useI18n } from 'vue-i18n';
import { str } from '~/lib/str';
const router = useRouter();
const { t } = useI18n()
// FIXME: adapter les props et tout
const props = defineProps<{
  model: string;
  id: string;
}>()

const showAlert = ref(false)
async function onDelete() {
  const modelApi = API_ROUTES.models[props.model as keyof typeof API_ROUTES.models];
  if (!('delete' in modelApi) || typeof modelApi.delete !== 'function') {
    toast.error(str(t('global.toast.description.deletion_not_supported')).capitalize().value());
    showAlert.value = false;
    return;
  }
  try {
    await apiFetch(modelApi.delete(props.id), { method: 'DELETE' })
    toast.success(t('global.toast.title.success'), {
      description: str(t('global.toast.description.deleted_model', { article: t('global.article.the_s'), model: t('model.companies.name') })).capitalize().value(),
    })
    router.push(ROUTES.dashboard.companies.index)
  } catch (err) {
  if (err instanceof ApiError && err.status === 409) {
    toast.info(t('global.toast.title.conflict'), {
      description: err.message, // ← message backend ici
    })
  } else {
    toast.error(t('global.toast.title.error'), {
      description: str(t('global.toast.description.error_deletion')).capitalize().value(),
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
        <span class="sr-only">{{ $t('global.action.open_menu') }}</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem :title="$t('global.action.show_model', { article: $t('global.article.the_s'), model: $t('model.companies.name') })">
        <NuxtLink class="flex items-center gap-2" :to="getDashboardShow(props.model, props.id) || ''">
          <EyeIcon class="w-4 h-4" />
          <span>
            {{ $t('global.action.show') }}
          </span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem :title="$t('global.action.edit_model', { article: $t('global.article.the_s'), model: $t('model.companies.name') })">
        <NuxtLink class="flex items-center gap-2" :to="getDashboardEdit(props.model, props.id) || ''">
          <PencilIcon class="w-4 h-4" />
          <span>
            {{ $t('global.action.edit') }}
          </span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem :title="$t('global.action.delete_model', { article: $t('global.article.the_s'), model: $t('model.companies.name') })" @click="showAlert = true" class="flex items-center gap-2">
        <TrashIcon class="w-4 h-4" />
        <span>
          {{ $t('global.action.delete') }}
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
    <AlertModal :open="showAlert" :title="$t('global.alert.delete.title')" :description="$t('global.alert.delete.description')"
      @update:open="showAlert = $event" @confirm="onDelete" />
  </DropdownMenu>

</template>