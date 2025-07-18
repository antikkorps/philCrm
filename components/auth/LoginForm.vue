<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">{{ $t('login.title') }}</h1>
      <p class="text-muted-foreground text-sm text-balance">
        {{ $t('login.description') }}
      </p>
    </div>

    <!-- Affichage des erreurs -->
    <div
      v-if="authStore.hasError"
      class="bg-destructive/10 border border-destructive/20 rounded-md p-3"
    >
      <p class="text-destructive text-sm">{{ authStore.error }}</p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-3">
        <Label for="email">{{ str($t('attributes.email.name')).capitalize().value() }}</Label>
        <Input
          id="email"
          v-model="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="password">{{ str($t('attributes.password.name')).capitalize().value() }}</Label>
          <a href="#" class="ml-auto text-sm underline-offset-4 hover:underline">
            {{ str($t('login.forgot_password')).capitalize().value() }}
          </a>
        </div>
        <Input id="password" v-model="password" type="password" required :placeholder="str($t('attributes.password.placeholder')).capitalize().value()" />
      </div>
      <Button type="submit" class="w-full" :disabled="authStore.isLoading">
        <span v-if="authStore.isLoading">{{ str($t('login.login_loading')).capitalize().value() }}</span>
        <span v-else>{{ str($t('login.login')).capitalize().value() }}</span> 
      </Button>
      <div
        class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
      >
        <span class="bg-background text-muted-foreground relative z-10 px-2">
          {{ str($t('login.login_with')).capitalize().value() }}
        </span>
      </div>
      <Button variant="outline" class="w-full">
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>  
        {{ str($t('login.login_with_github')).capitalize().value() }}
      </Button>
    </div>
    <div class="text-center text-sm">
      {{ str($t('login.no_account')).capitalize().value() }}
      <NuxtLink to="/register" class="underline underline-offset-4">
        {{ str($t('login.register_link')).capitalize().value() }}
      </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { str } from "~/lib/str"
import { useAuthStore } from "~/stores/auth.store"

const router = useRouter()
const authStore = useAuthStore()

const email = ref("")
const password = ref("")

async function onSubmit() {
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    // Redirection vers le dashboard après connexion
    await router.push("/dashboard")
  } catch (error) {
    // L'erreur est déjà gérée dans le store
    console.error("Erreur de connexion:", error)
  }
}
</script>
