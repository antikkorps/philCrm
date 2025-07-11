<template>
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Button v-if="actions.includes(GlobalActionsEnums.Back)" size="sm" as-child>
                <NuxtLink :title="$t('global.action.back')" :href="backHref">
                    <ArrowLeft class="size-4" />
                </NuxtLink>
            </Button>
            <h1 class="text-3xl font-bold">{{ title }}</h1>
        </div>
        <Button v-if="actions.includes(CrudActionsEnums.Create)" size="sm" as-child>
            <NuxtLink :title="$t('global.action.create')" :href="createHref">
                <Plus class="size-4" />
            </NuxtLink>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Plus } from 'lucide-vue-next';
import { CrudActionsEnums, GlobalActionsEnums } from '~/enums/actions';
import { getDashboardIndex, getDashboardCreate } from '~/utils/dashboardModelRoutes';

const props = defineProps<{
    title: string;
    actions: (CrudActionsEnums | GlobalActionsEnums)[]
}>()



const route = useRoute()
const modelParam = route.params.model as string


const backHref = computed(() => getDashboardIndex(modelParam))

const createHref = computed(() => getDashboardCreate(modelParam))

</script>