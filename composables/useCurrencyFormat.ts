import { useI18n } from "vue-i18n"

export function useCurrencyFormat() {
    const { locale } = useI18n()
    
    function formatCurrency(
      amount: number | null | undefined, 
      currency = 'EUR',
      options?: Intl.NumberFormatOptions
    ): string {
      if (amount === null || amount === undefined) return '-'
      
      return new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options
      }).format(amount)
    }
    
    return { formatCurrency }
  }