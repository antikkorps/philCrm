<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-vue-next'
// FIXME: not tested yet
interface Props {
  searchField: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: ''
})

const route = useRoute()
const router = useRouter()

// État local pour la date
const dateValue = ref('')

// Écouter les changements de date dans l'URL
watch(() => route.query[props.searchField], (newValue) => {
  if (newValue && typeof newValue === 'string') {
    dateValue.value = newValue
  } else {
    dateValue.value = ''
  }
}, { immediate: true })

// Computed pour vérifier si une date est active
const hasActiveDate = computed(() => {
  const param = route.query[props.searchField]
  return param && typeof param === 'string' && param.trim() !== '' && param !== null
})

// Appliquer la date
const applyDate = () => {
  const currentQuery = { ...route.query }
  
  if (dateValue.value.trim()) {
    currentQuery[props.searchField] = dateValue.value.trim()
  } else {
    delete currentQuery[props.searchField]
  }
  
  // Reset à la page 1 lors d'une nouvelle date
  delete currentQuery.page
  
  router.push({ query: currentQuery, replace: true })
}

// Reset la date
const resetDate = () => {
  dateValue.value = ''
  const currentQuery = { ...route.query }
  delete currentQuery[props.searchField]
  delete currentQuery.page
  
  router.push({ query: currentQuery, replace: true })
}

// Émettre l'événement pour informer le parent
const emit = defineEmits<{
  dateChange: [date: string]
}>()

// Écouter les changements de date pour émettre l'événement
watch(dateValue, (newValue) => {
  emit('dateChange', newValue)
})
</script>

<template>
  <div class="space-y-2">
    <Label>{{ label || `Date ${searchField}` }}</Label>
    
    <div class="flex gap-2">
      <Input
        type="date"
        v-model="dateValue"
        class="flex-1"
        @change="applyDate"
      />
      
      <Button
        type="button"
        variant="destructive"
        size="icon"
        :disabled="!hasActiveDate"
        @click="resetDate"
      >
        <X class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template> 