<template>
    <div class="flex items-center gap-4">
        <div class="bg-primary/20 text-primary h-14 w-14 flex items-center justify-center">
            <p class="text-lg font-bold">{{ modelValue?.name?.slice(0, 2) }}</p>
        </div>
        <div>
            <h1 class="text-xl font-bold">{{ modelValue?.name }}</h1>
            <div class="flex items-center gap-2">
                <p>{{ modelValue?.industry ? modelValue?.industry : '-' }}</p>
                <p 
                v-if="modelValue?.status"
                :class="`inline-block px-2 py-1 rounded-full text-xs tracking-wider font-normal capitalize ${textClass}`"
                    :style="{ background: modelValue?.status?.color }">{{ modelValue?.status?.name }}</p>
            </div>
            <p class="text-sm text-muted-foreground">{{ modelValue?.size ? `${modelValue?.size} Employés` : '-' }}</p>
            <p class="text-sm text-muted-foreground">Chiffre d'affaire global : {{ modelValue?.globalRevenue ? formatCurrency(modelValue?.globalRevenue, 'EUR', { maximumFractionDigits: 0 }) : '-' }}</p>
            <p class="text-sm text-muted-foreground">Chiffre d'affaire : A FAIRE</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getContrastTextColor } from '~/lib/utils';
import type { CompanyShow } from '~/types/company';
import { useCurrencyFormat } from '~/composables/useCurrencyFormat';

const props = defineProps<{
    modelValue?: CompanyShow | null
}>()

const color = props.modelValue?.status?.color || '#888888'
const textClass = getContrastTextColor(color);
const { formatCurrency } = useCurrencyFormat();
</script>