export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
  if (!authStore.isLoggedIn && to.path.startsWith("/dashboard")) {
    return navigateTo("/login")
  }

  // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
  if (authStore.isLoggedIn && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/dashboard")
  }
})
