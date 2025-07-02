<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Tableau de bord</h1>
      <p class="text-muted-foreground">Bienvenue, {{ authStore.currentUser?.name }} !</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Carte utilisateur -->
      <div class="bg-card border rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Informations utilisateur</h3>
        <div class="space-y-2">
          <p><strong>Nom :</strong> {{ authStore.currentUser?.name }}</p>
          <p><strong>Email :</strong> {{ authStore.currentUser?.email }}</p>
          <p>
            <strong>Membre depuis :</strong>
            {{ formatDate(authStore.currentUser?.createdAt) }}
          </p>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="bg-card border rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Actions rapides</h3>
        <div class="space-y-2">
          <Button variant="outline" class="w-full justify-start">
            <Settings class="mr-2 h-4 w-4" />
            Paramètres
          </Button>
          <Button variant="outline" class="w-full justify-start" @click="handleLogout">
            <LogOut class="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { LogOut, Settings } from "lucide-vue-next"

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
})

const authStore = useAuthStore()
const router = useRouter()

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A"
  return new Date(dateString).toLocaleDateString("fr-FR")
}

async function handleLogout() {
  try {
    await authStore.logout()
    await router.push("/login")
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
  }
}
</script>
