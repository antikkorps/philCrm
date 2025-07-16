<script setup lang="ts">
import { useFilter, type AcceptableInputValue } from 'reka-ui'
import { computed, ref, nextTick } from 'vue'
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'
import { str } from '~/lib/str'
import { Button } from '~/components/ui/button'
import { X } from 'lucide-vue-next'

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

const selectedValues = ref<string[]>([])
const componentKey = ref(0)
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

// À l'initialisation et à chaque changement d'URL, synchronise selectedValues avec le paramètre dynamique
watch(
    () => route.query[props.searchField],
    async (newValue) => {
        if (typeof newValue === 'string' && newValue.length > 0) {
            selectedValues.value = newValue.split(',').filter(Boolean)
        } else {
            selectedValues.value = []
        }
        componentKey.value++
        await nextTick()
        emit('update:modelValue', selectedValues.value.join(','))
    },
    { immediate: true }
)

// Si le modelValue change (par ex. via props), synchronise aussi - MAIS PAS au démarrage
watch(
    () => props.modelValue,
    (newValue) => {
        // Ne pas écraser selectedValues si on est en train de le synchroniser depuis l'URL
        if (typeof newValue === 'string' && newValue.length > 0) {
            selectedValues.value = newValue.split(',').filter(Boolean)
        } else {
            // Ne pas remettre à [] si on a déjà des valeurs depuis l'URL
            if (selectedValues.value.length === 0) {
                selectedValues.value = []
            }
        }
    },
    { immediate: false } // Changé à false pour éviter le conflit initial
)

watch(
    () => props.options,
    () => {
        selectedValues.value = [...selectedValues.value]
    },
    { immediate: true, deep: true }
)

function addValue(val: string) {
    if (!selectedValues.value.includes(val)) {
        selectedValues.value = [...selectedValues.value, val]
        emit('update:modelValue', selectedValues.value.join(','))
    }
}

function removeValue(val: string) {
    selectedValues.value = selectedValues.value.filter(v => v !== val)
    emit('update:modelValue', selectedValues.value.join(','))
}

function updateSelectedValues(newValues: AcceptableInputValue[]) {
    // Convertir les valeurs en strings si nécessaire
    const stringValues = newValues.map(val => typeof val === 'string' ? val : String(val))
    selectedValues.value = stringValues
    emit('update:modelValue', selectedValues.value.join(','))
}
const valueToLabel = (val: string) => {
    const found = (props.options || []).find(opt => opt.value === val)
    return found ? found.label : val
}
const resetSelection = () => {
    selectedValues.value = []
    const currentQuery = { ...route.query }
    delete currentQuery[props.searchField]
    delete currentQuery.page

    router.push({ query: currentQuery, replace: true })
    emit('update:modelValue', '')
}

const open = ref(false)
const searchTerm = ref('')

const selectedLabels = computed(() => {
    return selectedValues.value
        .map(val => {
            const found = (props.options || []).find(opt => opt.value === val)
            return found ? found.label : val
        })
        .filter(label => label !== undefined && label !== null && label !== '')
})

</script>

<template>
    <Label>{{ str($t(`${label}`)).capitalize().value() || `Sélectionner ${searchField}` }}</Label>
        <div class="flex gap-2 items-center relative">
        <Combobox class="w-full" v-model:open="open" :ignore-filter="true">
            <ComboboxAnchor class="w-full" as-child>
                <TagsInput :key="componentKey" :model-value="selectedValues" @update:model-value="updateSelectedValues"
                    class="w-full px-2 gap-0 flex flex-col items-start">
                    <div class="flex gap-2 flex-wrap items-center">
                        <TagsInputItem v-for="item in selectedValues" :key="item" :value="item">
                            <span class="py-0.5 px-2 text-sm rounded bg-transparent">{{ valueToLabel(item) }}</span>
                            <TagsInputItemDelete @click="removeValue(item)" />
                        </TagsInputItem>
                    </div>

                    <ComboboxInput v-model="searchTerm" as-child>
                        <TagsInputInput :placeholder="str($t(`${label}`)).capitalize().value()"
                            class="min-w-[200px] w-full p-0 border-none focus-visible:ring-0 h-auto"
                            @keydown.enter.prevent />
                    </ComboboxInput>
                </TagsInput>

                <ComboboxList class="w-[--reka-popper-anchor-width]">
                    <ComboboxEmpty />
                    <ComboboxGroup>
                        <ComboboxItem v-for="option in options" :key="option.value" :value="option.value"
                            @select.prevent="(ev) => {
                                if (typeof ev.detail.value === 'string') {
                                    searchTerm = ''
                                    addValue(ev.detail.value)
                                }
                                if (options.length === 0) {
                                    open = false
                                }
                            }">
                            {{ option.label }}
                        </ComboboxItem>
                    </ComboboxGroup>
                </ComboboxList>
            </ComboboxAnchor>
        </Combobox>
        <Button type="button" variant="outline" size="xxs" :disabled="!selectedValues.length" @click="resetSelection">
        <X class="h-2 w-2" />
      </Button> 
    </div>
</template>