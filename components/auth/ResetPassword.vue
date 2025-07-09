<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">{{ str($t('reset_password.title')).capitalize().value() }}</h1>
      <p class="text-muted-foreground text-sm text-balance">
        {{ str($t('reset_password.description')).capitalize().value() }}
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-3">
        <Label for="email">{{ str($t('attributes.email.name')).capitalize().value() }}</Label>
        <Input id="email" type="email" placeholder="m@example.com" v-model="email" required />
      </div>
      <Button type="submit" class="w-full">
        {{ str($t('reset_password.reset_password')).capitalize().value() }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { str } from '~/lib/str'

const email = ref('')

function onSubmit() {
  // Logique de connexion à ajouter ici
  console.log('Email:', email.value)
}
</script> 