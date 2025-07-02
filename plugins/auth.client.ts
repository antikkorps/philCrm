export default defineNuxtPlugin(async () => {
  const { useAuthStore } = await import("~/stores/auth.store")
  const authStore = useAuthStore()

  // Initialisation du store d'authentification
  await authStore.initialize()
})
