<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-vue-next'
import { str } from '~/lib/str'
// FIXME: not fully tested yet
interface Props {
  searchField: string
  label?: string
  options?: Array<{ value: string, label: string }>
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  options: () => [],
  modelValue: ''
})
const route = useRoute()
const router = useRouter()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  if (newVal !== selectedValue.value) {
    selectedValue.value = newVal || ''
  }
})

watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Écouter les changements de sélection dans l'URL
watch(() => route.query[props.searchField], (newValue) => {
  if (newValue && typeof newValue === 'string') {
    selectedValue.value = newValue
  } else {
    selectedValue.value = ''
  }
}, { immediate: true })

// Computed pour vérifier si une sélection est active
const hasActiveSelection = computed(() => {
  const param = route.query[props.searchField]
  return param && typeof param === 'string' && param.trim() !== '' && param !== null
})


// Reset la sélection
const resetSelection = () => {
  selectedValue.value = ''
  const currentQuery = { ...route.query }
  delete currentQuery[props.searchField]
  delete currentQuery.page

  router.push({ query: currentQuery, replace: true })
}
</script>

<template>
  <div class="space-y-2">
    <Label>{{ str($t(`${label}`)).capitalize().value() || `Sélectionner ${searchField}` }}</Label>

    <div class="flex gap-2 items-center">
      <Select v-model="selectedValue">
        <SelectTrigger class="flex-1">
          <SelectValue :placeholder="str($t(`${label}`)).capitalize().value()" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Button type="button" variant="outline" size="xxs" :disabled="!selectedValue" @click="resetSelection">
        <X class="h-2 w-2" />
      </Button>
    </div>
  </div>
</template>