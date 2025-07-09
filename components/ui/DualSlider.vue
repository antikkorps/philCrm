<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed, toRef, ref, watch, onMounted } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import PhilInput from '@/components/forms/PhilInput.vue'
import { inputTypes } from '~/types/inputs'
import Label from './label/Label.vue'
import { useRoute } from 'vue-router'
import LabelFilter from '../models/table/Filters/LabelFilter.vue'
import { str } from '~/lib/str'

const props = defineProps<SliderRootProps & {
  class?: HTMLAttributes['class'],
  minHelper?: string,
  maxHelper?: string,
  label?: string,
  devise?: string,
  minName?: string,
  maxName?: string,
  modelValue?: [number, number]
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: [number, number]): void
  (e: 'range-change', payload: Record<string, number>): void
}>()
const delegatedProps = reactiveOmit(props, 'class', 'minHelper', 'maxHelper', 'label', 'devise', 'minName', 'maxName', 'modelValue')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Bornes min/max du slider
const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)

// Valeur interne si pas de v-model
const internalValue = ref<[number, number]>([
  min.value,
  max.value
])

const route = useRoute()

function getInitialValueFromRoute() {
  let minVal = min.value
  let maxVal = max.value
  if (props.minName && route.query[props.minName] !== undefined) {
    const minParam = Number(route.query[props.minName])
    if (!isNaN(minParam)) minVal = minParam
  }
  if (props.maxName && route.query[props.maxName] !== undefined) {
    const maxParam = Number(route.query[props.maxName])
    if (!isNaN(maxParam)) maxVal = maxParam
  }
  return [minVal, maxVal] as [number, number]
}

internalValue.value = getInitialValueFromRoute()

watch(
  () => [props.minName ? route.query[props.minName] : undefined, props.maxName ? route.query[props.maxName] : undefined],
  () => {
    internalValue.value = getInitialValueFromRoute()
  }
)

// Utilise la valeur du parent si présente, sinon l'interne
const sliderValue = computed({
  get() {
    return props.modelValue ?? internalValue.value
  },
  set(val: [number, number]) {
    if (props.modelValue !== undefined) {
      emits('update:modelValue', val)
    } else {
      internalValue.value = val
    }
  }
})

function updateMin(val: number) {
  const newMin = Math.min(Math.max(val, min.value), sliderValue.value[1])
  sliderValue.value = [newMin, sliderValue.value[1]]
}
function updateMax(val: number) {
  const newMax = Math.max(Math.min(val, max.value), sliderValue.value[0])
  sliderValue.value = [sliderValue.value[0], newMax]
}

const minInputField = computed(() => ({
  data: sliderValue.value[0],
  setData: (_: string, val: number) => updateMin(val),
  inputType: inputTypes.number,
  number: { min: min.value, max: sliderValue.value[1] }
}))

const maxInputField = computed(() => ({
  data: sliderValue.value[1],
  setData: (_: string, val: number) => updateMax(val),
  inputType: inputTypes.number,
  number: { min: sliderValue.value[0], max: max.value }
}))

watch(sliderValue, ([minVal, maxVal]) => {
  if (props.minName && props.maxName) {
    emits('range-change', { [props.minName]: minVal, [props.maxName]: maxVal })
  }
})

const displaySliderValue = computed(() => {
  const val = sliderValue.value
  if (Array.isArray(val) && (val as number[]).length === 2) return val
  if (Array.isArray(val) && (val as number[]).length === 1) return [val[0], props.max ?? 100]
  return [props.min ?? 0, props.max ?? 100]
})

defineExpose({
  sliderValue,
  getCurrentValue: () => sliderValue.value,
  minName: props.minName,
  maxName: props.maxName
})
</script>

<template>
  <div class="w-full">
    <LabelFilter :label-for="label" v-if="label" :label="str($t(`${label}`)).capitalize().value()" />
    <div class="flex items-center gap-2 mb-4">
      <div class="flex flex-col items-center">
        <PhilInput :group="{ label: str($t('filtres.min')).capitalize().value(), className: 'w-full' }" :field="minInputField" fieldName="min" />
        <span v-if="props.minHelper" class="text-xs text-muted-foreground mt-1">{{ props.minHelper }}</span>
      </div>
      <span class="text-muted-foreground mt-4">—</span>
      <div class="flex flex-col items-center">
        <PhilInput :group="{ label: str($t('filtres.max')).capitalize().value(), className: 'w-full' }" :field="maxInputField" fieldName="max" />
        <span v-if="props.maxHelper" class="text-xs text-muted-foreground mt-1">{{ props.maxHelper }}</span>
      </div>
    </div>
    <slot name="helper" :min="(displaySliderValue && displaySliderValue[0] !== undefined ? displaySliderValue[0] : 0)"
      :max="(displaySliderValue && displaySliderValue[1] !== undefined ? displaySliderValue[1] : 100)" />
    <SliderRoot :model-value="sliderValue" @update:model-value="sliderValue = $event as [number, number]"
      data-slot="slider" :class="cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        props.class,
      )" v-bind="forwarded">
      <SliderTrack data-slot="slider-track"
        class="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
        <SliderRange data-slot="slider-range"
          class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderTrack>
      <SliderThumb v-for="(_, key) in (Array.isArray(displaySliderValue) ? displaySliderValue : [0, 100])" :key="key"
        data-slot="slider-thumb"
        class="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
    </SliderRoot>
    <div class="mt-2" v-if="label">
      <p class="text-sm  text-muted-foreground">{{ name }} {{ $t('filtres.min') }}: {{ (displaySliderValue && displaySliderValue[0] !== undefined ? displaySliderValue[0] : 0) }} {{
        props.devise }} — {{ name }} {{ $t('filtres.max') }}: {{ (displaySliderValue && displaySliderValue[1] !== undefined ?
        displaySliderValue[1] : 100) }} {{ props.devise }}</p>
    </div>
  </div>
</template>