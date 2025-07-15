<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import models from '~/configs/models'
import TitleSection from '~/components/ui/TitleSection.vue'
import { CrudActionsEnums, GlobalActionsEnums } from '~/enums/actions'
import { API_ROUTES } from '~/configs/api_routes'

definePageMeta({ layout: 'dashboard' })
const route = useRoute()
const model = route.params.model as string

const id = route.params.id
const data = ref<any | null>(null)
// ajouter un loading
const loading = ref(true)
onMounted(async () => {
  const showRoute = API_ROUTES.models[model as keyof typeof API_ROUTES.models].show;
  const url = typeof showRoute === 'function' ? showRoute(id as string) : showRoute;
  const res = await apiFetch(url).catch((err) => { });
  data.value = res ?? null;
  loading.value = false;
});

const entry = models[model as keyof typeof models];
const componentPromise = entry && CrudActionsEnums.Show in entry
  ? async () => {
    const mod = await (entry[CrudActionsEnums.Show as keyof typeof entry] as () => Promise<any>)();
    return mod.default ? mod : { default: mod };
  }
  : undefined;
const component = componentPromise ? defineAsyncComponent(componentPromise) : null;
const actions = [
  GlobalActionsEnums.Back
]

</script>

<template>
  <TitleSection 
  :model="model" 
  :title="$t('global.action.show_model')" :actions="actions" />
  <Suspense v-if="!loading">
    <component :is="component" v-if="component" :model-value="data" :action="CrudActionsEnums.Show" :model="model" />
    <div v-else>Modèle inconnu</div>
  </Suspense>
</template>
