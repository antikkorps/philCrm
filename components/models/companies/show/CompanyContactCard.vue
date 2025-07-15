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
import type { Contact } from '~/types/contact';
import CellActions from '../../table/CellActions.vue';
import DataTable from '../../table/DataTable.vue';
import {Button} from "@/components/ui/button"
import { Plus } from 'lucide-vue-next';

defineProps<{
    modelValue?: CompanyShow | null
}>()

const columns: ColumnDef<Contact>[] = [
    {
        accessorKey: 'complete_name',
        header: 'attributes.complete_name.name',
        cell: ({ row }) => {
            const contact = row.original
            return h('span', contact.firstName + ' ' + contact.lastName)
        }
    },
    {
        accessorKey: 'email',
        header: 'attributes.email.name',
    },
    {
        accessorKey: 'phone',
        header: 'attributes.phone.name',
    },
    {
        accessorKey: 'position',
        header: 'attributes.position.name',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return h('div', { class: 'relative' }, h(CellActions, {
                model: 'contacts',
                id: row.original.id,
            }))
        },
    },
]


const createHref = computed(() => getDashboardCreate('contacts'))


</script>

<template>
    <Card>
        <CardHeader class="flex items-center justify-between">
            <CardTitle>Contacts</CardTitle>
            <Button size="sm" as-child>
            <NuxtLink :title="$t('global.action.create')" :href="createHref">
                <Plus class="size-4" />
            </NuxtLink>
        </Button>
        </CardHeader>
        <CardContent class="w-full overflow-x-auto">
            <DataTable v-if="modelValue?.Contacts" :columns="columns" :data="modelValue?.Contacts" />
        </CardContent>
    </Card>
</template>
