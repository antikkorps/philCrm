import type { Table } from '@tanstack/vue-table'
import type { TFunction } from 'vue-i18n'

declare module '@tanstack/vue-table' {
  interface TableMeta<TData extends unknown> {
    t: TFunction
  }
}