<script setup lang="ts">
import type { CrudActionsEnums } from '~/enums/actions';
import type { CompanyShow } from '~/types/company';
import CompanyAvatar from './show/CompanyAvatar.vue';
import CompanyDetailsCard from './show/CompanyDetailsCard.vue';
import CompanyContactCard from './show/CompanyContactCard.vue';
import CompanyTaskCard from './show/CompanyTaskCard.vue';
import CompanyLastCard from './show/CompanyLastCard.vue';
import CompanyNoteCard from './show/CompanyNoteCard.vue';

const props = defineProps<{
    modelValue?: CompanyShow | null
    action: CrudActionsEnums
    model: string
}>()

console.log(props.modelValue)
</script>

<template>
    <!-- {{ JSON.stringify(modelValue) }} -->
    <div class="w-full space-y-6 mt-12">
        <CompanyAvatar :model-value="modelValue" />
    <div class="grid lg:grid-cols-12 lg:gap-4 w-full">
        <div class=" lg:col-span-8 col-span-12 space-y-6">
            <CompanyDetailsCard :model-value="modelValue" />
            <CompanyContactCard :model-value="modelValue" />
            <CompanyTaskCard :model-value="modelValue" />
            <CompanyNoteCard :model-value="modelValue" />
            <CompanyLastCard />
        </div>
        <div class="lg:col-span-4 col-span-12">
           ici
        </div>
    </div>
    </div>
</template>