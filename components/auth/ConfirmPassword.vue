<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Changez votre mot de passe</h1>
      <p class="text-muted-foreground text-sm text-balance">
        Créer un nouveau mot de passe
      </p>
    </div>
    <div class="grid gap-5">
      <div class="grid gap-3">
        <Label for="password">Mot de passe</Label>
        <Input id="password" type="password" v-model="password" required />
      </div>
      <div class="grid gap-3">
        <Label for="confirmPassword">Confirme le mot de passe</Label>
        <Input id="confirmPassword" type="password" v-model="confirmPassword" required />
      </div>
      <Button type="submit" class="w-full">
        Changer mon mot de passe
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const password = ref('')
const confirmPassword = ref('')

function onSubmit() {
  // Logique d'inscription à ajouter ici
  console.log('Password:', password.value)
  console.log('Confirmation:', confirmPassword.value)
}
</script> 