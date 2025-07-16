<script setup lang="ts">
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { CompanyShow } from '~/types/company';
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DataTable from '../../table/DataTable.vue';
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-vue-next';
import type { Activity } from '~/types/activity';
import { API_ROUTES } from '~/configs/api_routes';
import { cn, getContrastTextColor } from '~/lib/utils';
import { useDateFormat } from '~/composables/useDateFormat'
import { getPriorityColor, getTaskStatusColor, ActivityPriority, TaskStatus } from '~/enums/activities';
import { str } from '~/lib/str';
import { useI18n } from 'vue-i18n';

const { formatDate } = useDateFormat()
defineProps<{
    modelValue?: CompanyShow | null
}>()

const columns: ColumnDef<Activity>[] = [
    {
        accessorKey: 'title',
        header: 'attributes.title.name',
    },
    {
        accessorKey: 'taskStatus',
        header: 'attributes.status.name',
        cell: ({ row }) => {
            const { t } = useI18n()
            const status = row.original.taskStatus;
            if (!status) return;
            const color = getTaskStatusColor(status as TaskStatus);
            const textClass = getContrastTextColor(color);
            return h('span',
                {
                    class: cn(
                        status
                            ? 'inline-block px-2 py-1 rounded-full text-xs tracking-wider font-normal capitalize'
                            : 'hidden',
                        textClass
                    ),
                    style: `background-color: ${color};`,
                },
                { default: () => str(t('enums.activities.taskStatus.' + status)).capitalize().value() }
            );
        }
    },
    {
        accessorKey: 'dueDate',
        header: 'attributes.dueDate.name',
        cell: ({ row }) => formatDate(row.original.dueDate)
    },
    {
        accessorKey: 'priority',
        header: 'attributes.priority.name',
        cell: ({ row }) => {
            const priority = row.original.priority;
            const color = getPriorityColor(priority as ActivityPriority);
            const textClass = getContrastTextColor(color);
            return h('span',
                {
                    class: cn(row.original.priority ? 'inline-block px-2 py-1 rounded-full text-xs tracking-wider font-normal capitalize' : 'hidden', textClass),
                    style: `background-color: ${color};`,
                }, { default: () => row.original.priority });
        }
    },
    // TODO: ajouter un select pour changer à la volée
    {
        accessorKey: 'assignedTo',
        header: 'attributes.assigned_to.name',
    }
]
const route = useRoute()
const companyId = route.params.id
const notes = ref<Activity[]>([]);
const loading = ref(true)
onMounted(async () => {
    const url = API_ROUTES.models.activities.getActivitiesByCompany({ limit: -1, 
        // taskStatus: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS],
        // types: ActivityType.NOTE,
        companyId
    });
    const res: { items: Activity[] } | null = await apiFetch(url).catch(() => null);
    notes.value = res?.items ?? []
    loading.value = false;
});
const createHref = computed(() => getDashboardCreate('activities'))


</script>

<template>
    <Card>
        <CardHeader class="flex items-center justify-between">
            <CardTitle>{{ str($t('company.notes.title', 2)).capitalize().value() }}</CardTitle>
            <Button size="sm" as-child>
                <NuxtLink :title="$t('global.action.create')" :href="createHref">
                    <Plus class="size-4" />
                </NuxtLink>
            </Button>
        </CardHeader>
        <CardContent class="w-full overflow-x-auto">
            <DataTable v-if="!loading" :columns="columns" :data="notes" />
        </CardContent>
    </Card>
</template>
