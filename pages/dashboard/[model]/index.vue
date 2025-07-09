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
const pagination = ref<PaginationType>()
const actions = [
  CrudActionsEnums.Create
]
import { apiFetch } from '~/utils/api';
import type { Company, CompanyResource } from '~/types/company'
import type { PaginationType } from '~/types/pagination'
import FiltersMenu from '~/components/models/table/Filters/FiltersMenu.vue'

// Fonction pour récupérer les données
const fetchData = async (page: number = 1, searchParams?: Record<string, string>) => {
  try {
    let url = `/api/${model}?page=${page}&limit=10`

    // Ajouter tous les paramètres de recherche
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && value.trim()) {
          url += `&${key}=${encodeURIComponent(value.trim())}`
        }
      })
    }
// FIXME: le type doit être générique dans la mesure du possible
    const dataResources: CompanyResource = await apiFetch(url)
    data.value = dataResources.items;
    console.log(url)
    console.log(data.value)
    pagination.value = dataResources.pagination;
    console.log(pagination.value)
  } catch (e) {
    console.error('Erreur lors du fetch du model:', e)
  }
}

// Fonction pour extraire les paramètres de recherche depuis l'URL
const getSearchParams = () => {
  const searchParams: Record<string, string> = {}
  Object.entries(route.query).forEach(([key, value]) => {
    // Exclure les paramètres spéciaux comme 'page'
    if (key !== 'page' && value && typeof value === 'string' && value.trim() !== '') {
      searchParams[key] = value
    }
  })
  return searchParams
}

// Gérer le changement de page
const handlePageChange = async (page: number) => {
  const searchParams = getSearchParams()
  await fetchData(page, searchParams)
}

// Écouter les changements de page dans l'URL
watch(() => route.query.page, async (newPage) => {
  if (newPage && typeof newPage === 'string') {
    const pageNumber = parseInt(newPage)
    if (pageNumber && pageNumber > 0) {
      const searchParams = getSearchParams()
      await fetchData(pageNumber, searchParams)
    }
  }
})

// Écouter les changements de recherche dans l'URL
watch(() => route.query, async () => {
  const page = parseInt(route.query.page as string) || 1
  const searchParams = getSearchParams()
  await fetchData(page, searchParams)
}, { deep: true })

onMounted(async () => {
  const [columnsData] = await Promise.all([
    resolveColumns(model),
    (async () => {
      const pageFromUrl = parseInt(route.query.page as string) || 1
      const searchParams = getSearchParams()
      await fetchData(pageFromUrl, searchParams)
    })()
  ])

  columns.value = columnsData
})
</script>

<template>
  <TitleSection :title="$t('global.crud.list_of', { article: $t('global.article.of_s'), model: $t('model.companies.name', 2) })" :actions="actions" />
  <div class=" py-10 space-y-5">
    <div className="w-full flex justify-end">
      <FiltersMenu :model="model" />
    </div>
    <form>
      <label for="locale-select">{{ $t('language') }}: </label>
      <select id="locale-select" v-model="$i18n.locale">
        <option value="en">en</option>
        <option value="fr">fr</option>
        <option value="ja">ja</option>
      </select>
    </form>
    <DataTable v-if="pagination" :columns="columns" :data="data" :pagination="pagination"
      @pageChange="handlePageChange" />
  </div>
</template>