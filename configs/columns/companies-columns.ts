import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Company } from '~/types/company'
import CellActions from '../../components/models/table/CellActions.vue'

export const CompaniesColumns: ColumnDef<Company>[] = [
    {
        accessorKey: 'name',
        header: 'Nom',
    },
    {
        accessorKey: 'website',
        header: 'Site web',
        cell: ({ row }) => {
            const website = row.getValue('website')
            return h('a', { href: website, target: '_blank', class: 'text-blue-500 underline' }, row.original.website)
        }
    },
    {
        accessorKey: 'industry',
        header: 'Industrie',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const payment = row.original
    
          return h('div', { class: 'relative' }, h(CellActions, {
            payment,
          }))
        },
      },
]