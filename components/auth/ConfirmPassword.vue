<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">{{ str($t('confirm_password.title')).capitalize().value() }}</h1>
      <p class="text-muted-foreground text-sm text-balance">
        {{ str($t('confirm_password.description')).capitalize().value() }}
      </p>
    </div>
    <div class="grid gap-5">
      <div class="grid gap-3">
        <Label for="password">{{ str($t('attributes.password.name')).capitalize().value() }}</Label>
        <Input :placeholder="str($t('attributes.password.placeholder')).capitalize().value()" id="password" type="password" v-model="password" required />
      </div>
      <div class="grid gap-3">
        <Label for="confirmPassword">{{ str($t('attributes.confirm_password.name')).capitalize().value() }}</Label>
        <Input :placeholder="str($t('attributes.confirm_password.placeholder')).capitalize().value()" id="confirmPassword" type="password" v-model="confirmPassword" required />
      </div>
      <Button type="submit" class="w-full">
        {{ str($t('confirm_password.change_password')).capitalize().value() }}
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

const password = ref('')
const confirmPassword = ref('')

function onSubmit() {
  // Logique d'inscription à ajouter ici
  console.log('Password:', password.value)
  console.log('Confirmation:', confirmPassword.value)
}
</script> 