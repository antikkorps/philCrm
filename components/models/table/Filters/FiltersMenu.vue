<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet'
import { Funnel, RotateCcw } from 'lucide-vue-next';
import SearchInput from './SearchInput.vue';
import { resolveFilters } from '~/utils/resolveFilters'
import SelectFilter from './SelectFilter.vue';
import DateFilter from './DateFilter.vue';
import CheckboxFilter from './CheckboxFilter.vue';
import DualSlider from '~/components/ui/DualSlider.vue';
import { Button } from '@/components/ui/button'
import { str } from '~/lib/str'

const props = defineProps<{
  model: string
}>();

const filters = ref<Array<{
  name: string
  label: string
  devise?: string
  minName?: string
  maxName?: string
  type: 'text' | 'select' | 'date' | 'range' | 'checkbox'
  options?: Array<{ value: string, label: string }>
  min?: number
  max?: number
  step?: number
}>>([])

const router = useRouter()
const route = useRoute()

const searchValues = ref<Record<string, string>>({})
const selectValues = ref<Record<string, string>>({})
const dateValues = ref<Record<string, string>>({})

const isOpen = ref(false)

onMounted(async () => {
  filters.value = await resolveFilters(props.model)
})

const dualSliderRefs: { [key: string]: any } = {}

function handleRangeChange(payload: Record<string, number>) {
  // est ce qu'on ajoute le range en direct ? je dirais que non
}

function getAllDualSliderValues() {
  const result: Record<string, [number, number]> = {}
  for (const key in dualSliderRefs) {
    const refInstance = dualSliderRefs[key]
    if (!refInstance) continue
    const minName = refInstance.minName
    const maxName = refInstance.maxName
    let arr = refInstance.sliderValue ? refInstance.sliderValue.value : undefined
    if (arr === undefined && typeof refInstance.getCurrentValue === 'function') {
      arr = refInstance.getCurrentValue()
    }
    if (arr && typeof arr === 'object' && 'length' in arr && arr.length === 2) {
      result[key] = [arr[0], arr[1]]
    }
  }
  return result
}

async function applyFilters() {
  await nextTick()
  const allRanges = getAllDualSliderValues()
  const newQuery = { ...route.query }
  // Pour chaque DualSlider, récupère dynamiquement minName et maxName
  for (const key in dualSliderRefs) {
    const refInstance = dualSliderRefs[key]
    if (!refInstance) continue
    const minName = refInstance.minName
    const maxName = refInstance.maxName
    const values = allRanges[key]
    if (minName && maxName && values) {
      newQuery[minName] = String(values[0])
      newQuery[maxName] = String(values[1])
    } else {
      if (minName) delete newQuery[minName]
      if (maxName) delete newQuery[maxName]
    }
  }

  // Text fields
  Object.entries(searchValues.value).forEach(([field, val]) => {
    if (val && val.trim() !== '') {
      newQuery[field] = val;
    } else {
      delete newQuery[field];
    }
  });

  // Select fields
  Object.entries(selectValues.value).forEach(([field, val]) => {
    if (val && val.trim() !== '') newQuery[field] = val
    else delete newQuery[field]
  })

  // Date fields
  Object.entries(dateValues.value).forEach(([field, val]) => {
    if (val && val.trim() !== '') newQuery[field] = val
    else delete newQuery[field]
  })
  delete newQuery.page
  await router.push({ query: newQuery, replace: true })
  isOpen.value = false
}

// Utility function to update searchValues
function updateSearchValue(field: string, val: string) {
  searchValues.value = { ...searchValues.value, [field]: val }
}

function updateSelectValue(field: string, val: string) {
  selectValues.value = { ...selectValues.value, [field]: val }
}

function resetAllFilters() {
  searchValues.value = {};
  selectValues.value = {};
  dateValues.value = {};
  // Optional: reset sliders if needed
  // Object.keys(dualSliderRefs).forEach(key => {
  //   const refInstance = dualSliderRefs[key];
  //   if (refInstance && typeof refInstance.getCurrentValue === 'function') {
  //     // refInstance.sliderValue = [refInstance.min, refInstance.max];
  //   }
  // });
  router.push({ path: route.path, query: {} });
  isOpen.value = false
}

const nonDualSliderCount = computed(() =>
  filters.value.filter(f => f.type !== 'range').length
)
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger 
      :aria-label="str($t('filtres.label', 2)).capitalize().value()"
      :title="str($t('filtres.label', 2)).capitalize().value()"
    class="
    [&_svg]:size-5
    cursor-pointer border border-input rounded-md p-2 text-muted-foreground">
      <Funnel />
    </SheetTrigger>
    <SheetContent class=" md:max-w-2xl overflow-y-auto">
      <SheetHeader>
        <SheetTitle class="text-xl font-semibold">{{ str($t('filtres.filters_for', { model })).capitalize().value() }}</SheetTitle>
      </SheetHeader>

      <div class="px-4 space-y-4 mt-6">
        <!-- Filtres de type texte -->
        <div class="md:grid md:grid-cols-2 md:gap-4 space-y-4">
          <SearchInput v-for="filter in filters.filter(f => f.type === 'text' && f.name)" :key="filter.name"
            :search-field="filter.name" :label="filter.label"
            :modelValue="(searchValues.value && searchValues.value[filter.name as string]) || ''"
            @update:modelValue="(val: string) => updateSearchValue(filter.name, val)" />
        </div>

        <div v-if="nonDualSliderCount >= 2" class="h-px bg-input my-4"></div>
        <!-- Filtres de type select -->
        <SelectFilter
          v-for="filter in filters.filter(f => f.type === 'select' && f.name)"
          :key="filter.name"
          :search-field="filter.name"
          :label="filter.label"
          :options="filter.options"
          :modelValue="(selectValues.value && selectValues.value[filter.name as string]) || ''"
          @update:modelValue="val => updateSelectValue(filter.name, val)"
        />

        <!-- Filtres de type date -->
        <!-- <DateFilter v-for="filter in filters.filter(f => f.type === 'date')" :key="filter.field"
          :search-field="filter.field" :label="filter.label"
          @dateChange="val => dateValues.value[filter.field] = val" /> -->

        <DualSlider v-for="filter in filters.filter(f => f.type === 'range')" :key="filter.name"
          :ref="el => { if (el) dualSliderRefs[filter.name] = el }" :label="filter.label" :min="filter.min"
          :max="filter.max" :step="filter.step" :devise="filter.devise" :minName="filter.minName"
          :maxName="filter.maxName" @range-change="handleRangeChange" />


      </div>
      <SheetFooter>
        <div class="grid grid-cols-2 gap-4">
          <Button :title="str($t('global.action.apply_filters')).capitalize().value()" class="w-full flex items-center justify-center gap-2" @click="applyFilters">
            <Funnel class="size-4" />
            <span>{{ str($t('global.action.apply_filters')).capitalize().value() }}</span>
          </Button>
          <Button 
          :title="str($t('global.action.reset_filters')).capitalize().value()"
          class="w-full flex items-center justify-center gap-2" variant="secondary" type="button"
            @click="resetAllFilters">
            <RotateCcw class="size-4" />
            <span>{{ str($t('global.action.reset_filters')).capitalize().value() }}</span>
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>

  </Sheet>
</template>