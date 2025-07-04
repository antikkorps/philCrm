<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import models from '~/configs/models'
import { CrudActionsEnums, GlobalActionsEnums } from '~/enums/actions'
import { str } from '~/lib/str'
import TitleSection from '@/components/ui/TitleSection.vue'
definePageMeta({ layout: 'dashboard' })
const route = useRoute()
const model = route.params.model as string

const entry = models[model as keyof typeof models];
const componentPromise = entry && CrudActionsEnums.Create in entry
  ? async () => {
      const mod = await (entry[CrudActionsEnums.Create as keyof typeof entry] as () => Promise<any>)();
      return mod.default ? mod : { default: mod };
    }
  : undefined;
const component = componentPromise ? defineAsyncComponent(componentPromise) : null;
const actions = [
  GlobalActionsEnums.Back
]

</script>

<template>
   <TitleSection :title="'Create a ' + str(model).singular().value()" :actions="actions" />
  <Suspense>
    <component :is="component" v-if="component" :action="CrudActionsEnums.Create" />
    <div v-else>Modèle inconnu</div>
  </Suspense>
</template> 