<script setup lang="ts">
import PhilInput from '~/components/forms/PhilInput.vue';
import { z } from 'zod'
import type { Activity } from '~/types/activity';
import { API_ROUTES } from '~/configs/api_routes';
import type { Me, User, UserResource } from '~/lib/types/auth';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
import { toast } from 'vue-sonner';
import { str } from '~/lib/str';
const props = defineProps<{
    modelValue?: Activity
}>()

const assignSchema = z.object({
    assignedToId: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(), // FIXME: voir d'où vient l'info
})
type AssignFormData = z.infer<typeof assignSchema>
const errors = ref<Partial<Record<keyof AssignFormData, string>>>({})
const form = ref<AssignFormData>({
    assignedToId: props.modelValue?.assignedToId ?? '',
})

watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal) {
            Object.assign(form.value, newVal)
        }
    },
    { immediate: true }
)
const users = ref<User[]>([])
const loading = ref<boolean>(false)
try {
    // FIXME: peut être venir d'un local storage
    const me = await apiFetch(API_ROUTES.auth.me) as Me;
    const response = await apiFetch(API_ROUTES.models.tenants.userByTenant(me.tenantId)) as UserResource
    users.value = response.items
} catch (error) {
    // console.error('Erreur lors du fetch des utilisateurs:', error)
}

async function onSubmit() {
    loading.value = true;
    errors.value = {}
    const result = assignSchema.safeParse(form.value)
    if (!result.success) {
        for (const issue of result.error.issues) {
            const fieldName = issue.path[0] as keyof AssignFormData
            errors.value[fieldName] = issue.message
        }
        return
    }
    const updateUrl = API_ROUTES.models.activities.update(props.modelValue?.id);
    try {
        await apiFetch(updateUrl, {
            method: 'PUT',
            body: JSON.stringify(form.value)
        })
        toast.success(t('global.toast.title.success'), {
            description: str(t('global.toast.description.updated_model', { model: t(`model.activities.name`) })).capitalize().value(),
        })
    } catch (err) {
        toast.error(t('global.toast.title.error'), {
            description: t('global.toast.description.error_creation'),
        })

    }
    loading.value = false;
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <PhilInput :field="{
            class: 'mt-0',
            inputType: 'select',
            data: form.assignedToId,
            disabled: loading,
            setData: (key: string, value: any) => {
                (form as any)[key] = value
                onSubmit()
            },
            placeholder: str($t('attributes.assigned_to.placeholder')).capitalize().value(),
            options: users.map(user => ({
                label: user.firstName + ' ' + user.lastName,
                value: user.id
            })),
        }" :group="{
            error: errors.assignedToId,
        }" fieldName="assignedToId" :required="true" />
    </form>
</template>