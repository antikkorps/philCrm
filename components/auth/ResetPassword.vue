<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Réinitialiser votre mot de passe</h1>
      <p class="text-muted-foreground text-sm text-balance">
        Entrez votre adresse email pour reçevoir un mail pour réinitialiser votre mot de passe
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-3">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" v-model="email" required />
      </div>
      <Button type="submit" class="w-full">
        Réinitialiser mon mot de passe
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const email = ref('')

function onSubmit() {
  // Logique de connexion à ajouter ici
  console.log('Email:', email.value)
}
</script> 