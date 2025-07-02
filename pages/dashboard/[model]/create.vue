<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import models from '~/configs/models'
import { GlobalActionsEnums } from '~/enums/actions'
import { str } from '~/lib/str'
import TitleSection from '@/components/ui/TitleSection.vue'
definePageMeta({ layout: 'dashboard' })
const route = useRoute()
const model = route.params.model as string

const componentPromise = models[model as keyof typeof models]?.create
const component = componentPromise ? defineAsyncComponent(componentPromise) : null;

const actions = [
  GlobalActionsEnums.Back
]
</script>

<template>
   <TitleSection :title="'Create a ' + str(model).singular().value()" :actions="actions" />
  <Suspense>
    <component :is="component" v-if="component" />
    <div v-else>Modèle inconnu</div>
  </Suspense>
</template> 