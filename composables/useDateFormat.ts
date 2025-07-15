import { useI18n } from 'vue-i18n'

export function useDateFormat() {
  const { locale } = useI18n()

  function formatDate(dateString: string | null | undefined, options?: Intl.DateTimeFormatOptions): string {
    if (!dateString) return '-'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      ...options
    }).format(date)
  }

  return { formatDate }
}