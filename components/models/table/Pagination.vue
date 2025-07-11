<script setup lang="ts">
import type { PaginationType } from '~/types/pagination';
import { useRoute, useRouter } from 'vue-router';
import Pagination from '~/components/ui/pagination/Pagination.vue';

const props = defineProps<{
  pagination: PaginationType
}>()

const route = useRoute()
const router = useRouter()

// Fonction pour changer de page
const changePage = (page: number) => {
  // Émettre l'événement pour la page parente
  emit('pageChange', page)
  
  // Mettre à jour l'URL avec router.push pour déclencher le watch
  const currentQuery = { ...route.query }
  currentQuery.page = page.toString()
  router.push({ query: currentQuery, replace: true })
}

const emit = defineEmits<{
  pageChange: [page: number]
}>()

</script>

<template>
   <Pagination v-slot="{ page }" :items-per-page="pagination.itemsPerPage" :total="pagination.totalItems" :page="pagination.currentPage" @update:page="changePage">
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious @click="changePage(page - 1)" />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
          @click="changePage(item.value)"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis :index="4" />

      <PaginationNext @click="changePage(page + 1)" />
    </PaginationContent>
  </Pagination>
</template>