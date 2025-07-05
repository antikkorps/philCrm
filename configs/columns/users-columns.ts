import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export const UsersColumns: ColumnDef<any>[] = [
    {
        accessorKey: 'amount',
        header: () => h('div', { class: 'text-left' }, 'Amount'),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('amount'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return h('div', { class: 'text-left font-medium' }, formatted)
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('status')),
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
]