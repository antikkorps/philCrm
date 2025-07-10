import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import CellActions from '../../components/models/table/CellActions.vue'
import type { Contact } from '~/types/contact'

export const ContactsColumns: ColumnDef<Contact>[] = [
    {
        accessorKey: 'complete_name',
        header: 'attributes.complete_name.name',
        cell: ({ row }) => {
            const firstName = row.original.firstName
            const lastName = row.original.lastName
            return h('span', firstName + ' ' + lastName)
        },
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
        accessorKey: 'company',
        header: 'attributes.company.name',
        cell: ({ row }) => {
            const company = row.original.company
            return h('span', company?.name)
        },
    },
    {
        accessorKey: 'assignedTo',
        header: 'attributes.assigned_to.name',
        cell: ({ row }) => {
            const assignedTo = row.original.assignedTo
            return h('span', assignedTo?.firstName + ' ' + assignedTo?.lastName)
        },
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