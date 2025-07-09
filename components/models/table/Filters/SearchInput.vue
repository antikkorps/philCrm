<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-vue-next'
import LabelFilter from './LabelFilter.vue'
import { str } from '~/lib/str'

interface Props {
  searchField: string
  label?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'searchChange', value: string): void
}>()

const route = useRoute()
const router = useRouter()

// État local pour la recherche, synchronisé avec v-model
const searchValue = ref(props.modelValue)

// Synchronise searchValue avec modelValue venant du parent
watch(() => props.modelValue, (newVal) => {
  if (newVal !== searchValue.value) {
    searchValue.value = newVal || ''
  }
})

// Écouter les changements de recherche dans l'URL
watch(() => route.query[props.searchField], (newSearch) => {
  if (newSearch && typeof newSearch === 'string') {
    searchValue.value = newSearch
  } else {
    searchValue.value = ''
  }
}, { immediate: true })

// Computed pour vérifier si une recherche est active
const hasActiveSearch = computed(() => {
  const searchParam = route.query[props.searchField]
  return searchParam && typeof searchParam === 'string' && searchParam.trim() !== '' && searchParam !== null
})

// Reset la recherche
const resetSearch = () => {
  searchValue.value = ''
  emit('update:modelValue', '')
  emit('searchChange', '')
  const currentQuery = { ...route.query }
  delete currentQuery[props.searchField]
  delete currentQuery.page
  router.push({ query: currentQuery, replace: true })
}

// Émettre l'événement pour informer le parent à chaque changement
watch(searchValue, (newValue) => {
  emit('update:modelValue', newValue)
  emit('searchChange', newValue)
})
</script>

<template>
  <div class="space-y-2" >
    <LabelFilter :label-for="searchField" :label="str($t('filtres.search_by', { attribute: str($t(`attributes.${searchField}.name`)).capitalize().value() })).capitalize().value()" />
    <div class="flex items-center border border-input rounded-md p-1">
      <Input
        :id="`search-${searchField}`"
        v-model="searchValue"
        :placeholder="str($t('filtres.search_by', { attribute: str($t(`attributes.${searchField}.name`)).capitalize().value() })).capitalize().value()"
        class="h-7 flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
      />
      
      <Button
        type="button"
        variant="outline"
        size="xxs"
        :disabled="!hasActiveSearch"
        @click="resetSearch"
        :title="str($t('filtres.reset_search')).capitalize().value()"
      >
        <X class="h-2 w-2" />
      </Button>
    </div>
  </div>
</template> 