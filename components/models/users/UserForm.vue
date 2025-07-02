<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <PhilInput :field="{
      inputType: 'combobox',
      data: form.name,
      setData: (key, value) => form[key as keyof typeof form] = value,
      placeholder: 'Votre nom',
      options: [
        { label: 'Monsieur', value: 'Monsieur' },
        { label: 'Madame', value: 'Madame' },
      ]
    }" :group="{
      label: 'Nom',
      error: errors.name,
      description: 'Entrez votre nom'
    }" fieldName="name" :required="true" />

    <PhilInput :field="{
      inputType: 'email',
      data: form.email,
      setData: (key, value) => form[key as keyof typeof form] = value,
      placeholder: 'Votre email',
    }" :group="{
      label: 'Email',
      error: errors.email,
      description: 'Entrez votre adresse email'
    }" fieldName="email" :required="true" />

    <PhilInput :field="{
      inputType: 'checkbox',
      data: form.terms,
      setData: (key, value) => form[key as keyof typeof form] = value,
      placeholder: 'Accepter les conditions d\'utilisation',
    }" :group="{
      label: 'Conditions d\'utilisation',
      error: errors.terms,
      description: 'Accepter les conditions d\'utilisation'
    }" fieldName="terms" :required="true" />

    <PhilInput :field="{
      inputType: 'textarea',
      data: form.description,
      setData: (key, value) => form[key as keyof typeof form] = value,
      placeholder: 'Décrivez-vous en quelques mots',
      charCount: 250,
    }" :group="{
      label: 'Description',
      error: errors.description,
      description: 'Décrivez-vous en quelques mots'
    }" fieldName="description" :required="true" />

    <PhilInput :field="{
      inputType: 'otp',
      data: form.pin,
      setData: (key, value) => form[key as keyof typeof form] = value,
      placeholder: 'Entrez votre code PIN',
    }" :group="{
      label: 'Code PIN',
      error: errors.pin,
      description: 'Entrez votre code PIN'
    }" fieldName="pin" :required="true" />

    <PhilInput :field="{
      inputType: 'file',
      data: form.avatar,
      setData: (key, value) => form[key as keyof typeof form] = value,
      placeholder: 'Téléchargez votre avatar',
      file: {
        variant: 'default',
        multiple: false,
        accept: 'image/*',
        helper: 'Téléchargez votre avatar',
        uploadText: 'Téléchargez votre avatar',
        dragText: 'Téléchargez votre avatar',
      }
    }" :group="{
      label: 'Avatar',
      error: errors.avatar,
      description: 'Téléchargez votre avatar'
    }" fieldName="avatar" :required="true" />

    <PhilInput :field="{
      inputType: 'switch',
      data: form.notify,
      setData: (key, value) => form[key as keyof typeof form] = value,
      placeholder: 'Recevoir des notifications',
    }" :group="{
      label: 'Notifications',
      error: errors.notify,
      description: 'Recevoir des notifications'
    }" fieldName="notify"  />

    <button type="submit">
      {{ isEdit ? 'Mettre à jour' : 'Créer' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PhilInput from '~/components/forms/PhilInput.vue'
import { z } from 'zod'

const props = defineProps<{
  modelValue?: { name?: string; email?: string } | null
}>()

const emit = defineEmits(['submitted'])

const form = ref({
  name: props.modelValue?.name || 'Monsieur',
  email: props.modelValue?.email || '',
  terms: false,
  description: '',
  pin: '',
  avatar: null,
  notify: false,
} as Record<string, any>)

const errors = ref<Record<string, string>>({})

const userSchema = z.object({
  name: z.string().max(2, { message: 'Maximum 2 caractères' }),
  email: z.string().email({ message: 'Email invalide' }),
  description: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }),
  // Ajoute d'autres règles ici si besoin
})

watch(() => props.modelValue, (val) => {
  if (val) Object.assign(form.value, val)
})

const route = useRoute()
const isEdit = !!props.modelValue

async function onSubmit() {
  errors.value = {}
  const result = userSchema.safeParse(form.value)
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.value[issue.path[0] as string] = issue.message
    }
    return
  }
  if (isEdit) {
    emit('submitted', { ...form.value, id: route.params.id })
    alert('Utilisateur mis à jour !')
  } else {
    emit('submitted', form.value)
    alert('Utilisateur créé !')
  }
}
</script>