<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import DataTable from '@/components/models/table/DataTable.vue'
import { resolveColumns } from '@/utils/resolveColumns'
import TitleSection from '~/components/ui/TitleSection.vue'
import { CrudActionsEnums } from '~/enums/actions'
definePageMeta({ layout: 'dashboard' })
const route = useRoute()
const model = route.params.model as string

const columns = ref([])
const data = ref<Company[]>([])

const actions = [
  CrudActionsEnums.Create
]
onMounted(async () => {
  columns.value = await resolveColumns(model);
  // faire un fetch API générique ici :
  // data.value = await $fetch(`/api/${model}`)
  data.value = [
  {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
})

import { apiFetch } from '~/utils/api';
import type { CompanyResource } from '~/types/company'


onMounted(async () => {
  try {
    const companies: CompanyResource = await apiFetch(`/api/${model}?page=1&limit=10`)
    data.value = companies.items;
  } catch (e) {
    console.error('Erreur lors du fetch des companies:', e)
  }
})
</script>

<template>
  <TitleSection :title="'List of ' + model" :actions="actions" />
  <div class=" py-10">
    <DataTable :columns="columns" :data="data" />
  </div>
</template> 