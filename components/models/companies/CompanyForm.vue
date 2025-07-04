<template>
    <form @submit.prevent="onSubmit" class="space-y-4 border px-4 md:px-8 py-12 rounded-lg">
        <div class="grid md:grid-cols-2 gap-4">
            <PhilInput :field="{
                inputType: 'text',
                data: form.name,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Nom de l\'entreprise',
            }" :group="{
                label: 'Nom de l\'entreprise',
                error: errors.name
            }" fieldName="name" :required="true" />


            <PhilInput :field="{
                inputType: 'text',
                data: form.client_number,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Numéro de client',
            }" :group="{
                label: 'Numéro de client',
                error: errors.client_number
            }" fieldName="client_number" :required="false" />



        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <PhilInput :field="{
                inputType: 'url',
                data: form.website,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'URL du site web',
            }" :group="{
                label: 'URL du site web',
                error: errors.website
            }" fieldName="website" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                data: form.industry,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Industrie',
            }" :group="{
                label: 'Industrie',
                error: errors.industry
            }" fieldName="industry" :required="false" />

        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <PhilInput :field="{
                inputType: 'number',
                data: form.globalRevenue,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Chiffre d\'affaires global',
            }" :group="{
                label: 'Chiffre d\'affaires global',
                error: errors.globalRevenue
            }" fieldName="globalRevenue" :required="false" />
            <PhilInput :field="{
                inputType: 'text',
                data: form.size,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Taille de l\'entreprise',
            }" :group="{
                label: 'Taille de l\'entreprise',
                error: errors.size
            }" fieldName="size" :required="false" />

        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <PhilInput :field="{
                inputType: 'text',
                data: form.address,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Adresse',
            }" :group="{
                label: 'Adresse',
                error: errors.address
            }" fieldName="address" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                data: form.address_complement,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Complément d\'adresse',
            }" :group="{
                label: 'Complément d\'adresse',
                error: errors.address_complement
            }" fieldName="address_complement" :required="false" />

        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PhilInput :field="{
                inputType: 'text',
                data: form.city,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Ville',
            }" :group="{
                label: 'Ville',
                error: errors.city
            }" fieldName="city" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                data: form.zipCode,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Code postal',
            }" :group="{
                label: 'Code postal',
                error: errors.zipCode
            }" fieldName="zipCode" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                data: form.code_regional,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Code régional',
            }" :group="{
                label: 'Code régional',
                error: errors.code_regional
            }" fieldName="code_regional" :required="false" />
            <PhilInput :field="{
                inputType: 'text',
                data: form.country,
                setData: (key, value) => form[key as keyof typeof form] = value,
                placeholder: 'Pays',
            }" :group="{
                label: 'Pays',
                error: errors.country
            }" fieldName="country" :required="false" />

        </div>

        <Button type="submit">
            {{ isEdit ? 'Mettre à jour l\'entreprise' : 'Créer l\'entreprise' }}
        </Button>

    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PhilInput from '~/components/forms/PhilInput.vue'
import type { Company } from '~/types/company';
import { z } from 'zod'
import Button from '~/components/ui/button/Button.vue';

const props = defineProps<{
    modelValue?: Company | null
}>()

const emit = defineEmits(['submitted']);

const companySchema = z.object({
    name: z.string().max(2, { message: 'Maximum 2 caractères' }),
    website: z.string().url({ message: 'URL invalide' }).nullable(),
    industry: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
    client_group: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(), // FIXME: pas encore ajouté il faut voir d'où vient l'info
    client_number: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
    statusId: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }), // FIXME: voir d'où vient l'info
    assignedToId: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(), // FIXME: voir d'où vient l'info
    tenantId: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(), // FIXME: voir d'où vient l'info
    globalRevenue: z.number().nullable(), // il est nullable
    address: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
    address_complement: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
    city: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
    zipCode: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
    code_regional: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
    country: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
    size: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(),
})

// Type inféré automatiquement depuis le schema
type CompanyFormData = z.infer<typeof companySchema>

const form = ref<CompanyFormData>({
    name: '',
    website: '',
    industry: '',
    client_group: '',
    client_number: '',
    statusId: '',
    assignedToId: '',
    tenantId: '',
    globalRevenue: null,
    address: '',
    address_complement: '',
    city: '',
    zipCode: '',
    code_regional: '',
    country: '',
    size: '',
})

if (props.modelValue) {
    Object.assign(form.value, props.modelValue)
}

const errors = ref<Record<keyof CompanyFormData, string>>({} as Record<keyof CompanyFormData, string>)
const route = useRoute()
const isEdit = !!props.modelValue

async function onSubmit() {
    errors.value = {}
    const result = companySchema.safeParse(form.value)
    if (!result.success) {
        for (const issue of result.error.issues) {
            errors.value[issue.path[0] as string] = issue.message
        }
        return
    }
    if (isEdit) {
        emit('submitted', { ...form.value, id: route.params.id })
        alert('Entreprise mise à jour !')
    } else {
        emit('submitted', form.value)
        alert('Entreprise créée !')
    }
}
</script>