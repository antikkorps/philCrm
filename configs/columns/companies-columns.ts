import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Company } from '~/types/company'
import CellActions from '../../components/models/table/CellActions.vue'
import { getContrastTextColor } from '~/lib/utils'

export const CompaniesColumns: ColumnDef<Company>[] = [
  {
    accessorKey: 'name',
    header: 'Nom',
  },
  {
    accessorKey: 'industry',
    header: 'Industrie',
  },
  {
    accessorKey: 'size',
    header: 'Taille',
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigné à',
    cell: ({ row }) => {
      const assignedTo = row.original.assignedTo
      return h('span', assignedTo?.firstName + ' ' + assignedTo?.lastName)
    }
  },
  {
    accessorKey: 'globalRevenue',
    header: 'Revenu',
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }: any) => {
      const status = row.original.status.name
      const color = row.original.status.color || '#888888'
      const textClass = getContrastTextColor(color)
      return h(
        'span',
        {
          class: `inline-block px-2 py-1 rounded-full text-xs tracking-wider font-semibold capitalize ${textClass}`,
          style: `background-color: ${color};`,
        },
        status
      )
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(CellActions, {
        model: 'companies',
        id: row.original.id,
      }))
    },
  },
]