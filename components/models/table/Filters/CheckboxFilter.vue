<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { X } from 'lucide-vue-next'
// FIXME: not tested yet
interface Props {
  searchField: string
  label?: string
  options?: Array<{ value: string, label: string }>
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  options: () => []
})

const route = useRoute()
const router = useRouter()

// État local pour les sélections multiples
const selectedValues = ref<string[]>([])

// Écouter les changements de sélection dans l'URL
watch(() => route.query[props.searchField], (newValue) => {
  if (newValue) {
    if (typeof newValue === 'string') {
      selectedValues.value = [newValue]
    } else if (Array.isArray(newValue)) {
      selectedValues.value = newValue.filter(v => v !== null) as string[]
    }
  } else {
    selectedValues.value = []
  }
}, { immediate: true })

// Computed pour vérifier si des sélections sont actives
const hasActiveSelections = computed(() => {
  return selectedValues.value.length > 0
})

// Appliquer les sélections
const applySelections = () => {
  const currentQuery = { ...route.query }
  
  if (selectedValues.value.length > 0) {
    currentQuery[props.searchField] = selectedValues.value
  } else {
    delete currentQuery[props.searchField]
  }
  
  // Reset à la page 1 lors d'une nouvelle sélection
  delete currentQuery.page
  
  router.push({ query: currentQuery, replace: true })
}

// Gérer le changement d'une checkbox
const handleCheckboxChange = (value: string, checked: boolean) => {
  if (checked) {
    selectedValues.value.push(value)
  } else {
    selectedValues.value = selectedValues.value.filter(v => v !== value)
  }
  applySelections()
}

// Reset les sélections
const resetSelections = () => {
  selectedValues.value = []
  const currentQuery = { ...route.query }
  delete currentQuery[props.searchField]
  delete currentQuery.page
  
  router.push({ query: currentQuery, replace: true })
}

// Émettre l'événement pour informer le parent
const emit = defineEmits<{
  selectionsChange: [values: string[]]
}>()

// Écouter les changements de sélection pour émettre l'événement
watch(selectedValues, (newValues) => {
  emit('selectionsChange', newValues)
})
</script>

<template>
  <div class="space-y-2">
    <Label>{{ label || `Sélectionner ${searchField}` }}</Label>
    
    <div class="space-y-2">
      <div class="space-y-2">
        <div 
          v-for="option in options" 
          :key="option.value" 
          class="flex items-center space-x-2"
        >
          <Checkbox 
            :id="`${searchField}-${option.value}`"
            :checked="selectedValues.includes(option.value)"
            @update:checked="(checked: boolean) => handleCheckboxChange(option.value, checked)"
          />
          <Label :for="`${searchField}-${option.value}`" class="text-sm">
            {{ option.label }}
          </Label>
        </div>
      </div>
      
      <Button
        type="button"
        variant="destructive"
        size="sm"
        :disabled="!hasActiveSelections"
        @click="resetSelections"
      >
        <X class="h-4 w-4 mr-1" />
        Reset
      </Button>
    </div>
  </div>
</template> 