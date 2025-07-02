<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import models from '~/configs/models'
import TitleSection from '~/components/ui/TitleSection.vue'
import { GlobalActionsEnums } from '~/enums/actions'
definePageMeta({ layout: 'dashboard' })
const route = useRoute()
const model = route.params.model as string

const componentPromise = models[model as keyof typeof models]?.edit
const component = componentPromise ? defineAsyncComponent(componentPromise) : null;

const actions = [
  GlobalActionsEnums.Back
]
</script>

<template>
    <TitleSection :title="'Edit Patrice'" :actions="actions" />
  <Suspense>
    <component :is="component" v-if="component" />
    <div v-else>Modèle inconnu</div>
  </Suspense>
</template> 