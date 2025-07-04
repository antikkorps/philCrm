<template>
    <div class="container py-10 mx-auto">
        ici
        <!-- <DataTable :columns="UserColumns" :data="data" /> -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from '@/components/models/table/DataTable.vue'
import { apiFetch } from '~/utils/api';

const data = ref<any[]>([])

onMounted(async () => {
  try {
    const companies = await apiFetch('/companies?page=1&limit=10')
    data.value = companies
    console.log(companies)
  } catch (e) {
    console.error('Erreur lors du fetch des companies:', e)
  }
})
</script>