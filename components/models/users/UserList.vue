<template>
      <div class="container py-10 mx-auto">
    <DataTable :columns="UserColumns" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { UserColumns } from '~/configs/columns/users-columns'
import DataTable from '@/components/models/table/DataTable.vue'

const data = ref<any[]>([])

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>