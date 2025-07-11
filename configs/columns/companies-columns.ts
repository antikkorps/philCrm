import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Company } from '~/types/company'
import CellActions from '../../components/models/table/CellActions.vue'
import { getContrastTextColor } from '~/lib/utils'
import { str } from '~/lib/str'

export const CompaniesColumns: ColumnDef<Company>[] = [
  {
    accessorKey: 'name',
    header: 'attributes.name.name',
  },
  {
    accessorKey: 'industry',
    header: ({ table }) => table.options.meta?.t
    ? str(table.options.meta.t('attributes.industry.name')).capitalize().value()
    : 'Industry',
  },
  {
    accessorKey: 'size',
    header: 'attributes.size.name',
  },
  {
    accessorKey: 'assignedTo',
    header: 'attributes.assigned_to.name',
    cell: ({ row }) => {
      const assignedTo = row.original.assignedTo
      return h('span', assignedTo?.firstName + ' ' + assignedTo?.lastName)
    }
  },
  {
    accessorKey: 'globalRevenue',
    header: 'attributes.globalRevenue.name',
  },
  {
    accessorKey: 'status',
    header: 'attributes.status.name',
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
      return h('div', { class: 'relative' }, h(CellActions, {
        model: 'companies',
        id: row.original.id,
      }))
    },
  },
]