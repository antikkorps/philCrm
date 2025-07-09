// plugins/i18n.ts
import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(async ({ vueApp }) => {
  // Charge tous les fichiers de toutes les langues
  const files = import.meta.glob('../locales/*/*.json', { eager: true })

  // Structure attendue : { fr: { ... }, en: { ... } }
  const messages: Record<string, any> = {}

  for (const path in files) {
    // path exemple : '../locales/fr/global.json'
    const match = path.match(/..\/locales\/([^/]+)\/([^/]+)\.json$/)
    if (!match) continue
    const [, locale, namespace] = match
    messages[locale] = messages[locale] || {}
    // @ts-ignore
    Object.assign(messages[locale], files[path].default || files[path])
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'fr',
    messages,
  })

  vueApp.use(i18n)
})