<template>
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Button v-if="actions.includes(GlobalActionsEnums.Back)" size="sm" as-child>
                <NuxtLink :href="backHref">
                    <ArrowLeft class="size-4" />
                </NuxtLink>
            </Button>
            <h1 class="text-3xl font-bold">{{ title }}</h1>
        </div>
        <Button v-if="actions.includes(CrudActionsEnums.Create)" size="sm" as-child>
            <NuxtLink :href="createHref">
                <Plus class="size-4" />
            </NuxtLink>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Plus } from 'lucide-vue-next';
import { isCrudEntry, ROUTES } from '~/configs/routes';
import { CrudActionsEnums, GlobalActionsEnums } from '~/enums/actions';

const props = defineProps<{
    title: string;
    actions: (CrudActionsEnums | GlobalActionsEnums)[]
}>()



const route = useRoute()
const modelParam = route.params.model as string
const isValidModel = (key: string): key is keyof typeof ROUTES.dashboard =>
    key in ROUTES.dashboard;

const model = computed(() => {
    return isValidModel(modelParam) ? modelParam : null
})
const dashboardEntry = computed(() => {
    return model.value ? ROUTES.dashboard[model.value] : null
})
const backHref = computed(() => {
    if (dashboardEntry.value && isCrudEntry(dashboardEntry.value)) {
        return dashboardEntry.value.index
    } else if (typeof dashboardEntry.value === 'string') {
        return dashboardEntry.value
    }
    return '/'
})

const createHref = computed(() => {
    if (dashboardEntry.value && isCrudEntry(dashboardEntry.value)) {
        return dashboardEntry.value.create
    }
    return ''
})

</script>