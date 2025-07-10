<template>
    <form @submit.prevent="onSubmit" class="space-y-4 border px-4 md:px-8 py-12 rounded-lg">
        <div class="grid md:grid-cols-2 gap-4">
            <PhilInput :field="{
                inputType: 'text',
                disabled: !isEditable,
                data: form.firstName,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.firstName.placeholder', { of: $t('global.article.of', 0), article: '', model: $t(`model.${model}.name`) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.firstName.name')).capitalize().value(),
                error: errors.firstName
            }" fieldName="firstName" :required="true" />

            <PhilInput :field="{
                inputType: 'text',
                disabled: !isEditable,
                data: form.lastName,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.lastName.placeholder', { of: $t('global.article.of', 0), article: '', model: $t(`model.${model}.name`) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.lastName.name')).capitalize().value(),
                error: errors.lastName
            }" fieldName="lastName" :required="true" />

            <PhilInput :field="{
                inputType: 'email',
                disabled: !isEditable,
                data: form.email,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.email.placeholder', { of: $t('global.article.of', 0), article: '', model: $t(`model.${model}.name`) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.email.name')).capitalize().value(),
                error: errors.email
            }" fieldName="email" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                disabled: !isEditable,
                data: form.phone,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.phone.placeholder', { of: $t('global.article.of', 0), article: '', model: $t(`model.${model}.name`) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.phone.name')).capitalize().value(),
                error: errors.phone
            }" fieldName="phone" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                disabled: !isEditable,
                data: form.position,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.position.placeholder', { of: $t('global.article.of', 0), article: '', model: $t(`model.${model}.name`) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.position.name')).capitalize().value(),
                error: errors.position
            }" fieldName="position" :required="false" />

            <PhilInput :field="{
                inputType: 'select',
                data: form.assignedToId,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.assigned_to.placeholder')).capitalize().value(),
                options: users.map(user => ({
                    label: user.firstName + ' ' + user.lastName,
                    value: user.id
                })),
            }" :group="{
                label: str($t('attributes.assigned_to.name')).capitalize().value(),
                error: errors.assignedToId,
            }" fieldName="assignedToId" :required="true" />


            <PhilInput :field="{
                inputType: 'select',
                data: form.statusId,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.status.placeholder', { of: $t('global.article.of', 0), article: '', model: $t(`model.${model}.name`) })).capitalize().value(),
                options: statuses.map(status => ({
                    label: status.name,
                    value: status.id
                })),
            }" :group="{
                label: str($t('attributes.status.name')).capitalize().value(),
                error: errors.statusId,
            }" fieldName="statusId" :required="true" />

            <PhilInput :field="{
                inputType: 'select',
                data: form.companyId,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.company.placeholder', { of: $t('global.article.of', 0), article: '', model: $t(`model.${model}.name`) })).capitalize().value(),
                options: companies.map(company => ({
                    label: company.name,
                    value: company.id
                })),
            }" :group="{
                label: str($t('attributes.company.name')).capitalize().value(),
                error: errors.companyId,
            }" fieldName="companyId" :required="true" />


        </div>

        <Button v-if="isEditable" type="submit">
            {{ isEdit ? $t('global.action.edit_model') :
                $t('global.action.create_model') }}
        </Button>

    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PhilInput from '~/components/forms/PhilInput.vue'
import { z } from 'zod'
import Button from '~/components/ui/button/Button.vue';
import { API_ROUTES } from '~/configs/routes';
import { apiFetch } from '~/utils/api';
import type { Status, StatusResource } from '~/types/status';
import type { Me, User, UserResource } from '~/lib/types/auth';
import { toast } from 'vue-sonner';
import { CrudActionsEnums } from '~/enums/actions';
import { str } from '~/lib/str';
import type { Contact } from '~/types/contact';
import type { Company, CompanyResource } from '~/types/company';
const router = useRouter()
import { getDashboardIndex } from '~/utils/dashboardModelRoutes';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const props = defineProps<{
    modelValue?: Contact | null
    action: CrudActionsEnums
    model: string
}>()

const isEditable = computed(() => props.action === CrudActionsEnums.Edit || props.action === CrudActionsEnums.Create)
type ContactFormData = z.infer<typeof contactSchema>
const statuses = ref<Status[]>([])
const tenant = ref<any>()
const users = ref<User[]>([])
const companies = ref<Company[]>([])
const emit = defineEmits(['submitted']);
const errors = ref<Partial<Record<keyof ContactFormData, string>>>({})
const route = useRoute()
const isEdit = computed(() => props.action === CrudActionsEnums.Edit)


const contactSchema = z.object({
    firstName: z.string().max(250, { message: 'Maximum 250 caractères' }),
    lastName: z.string().max(250, { message: 'Maximum 250 caractères' }),
    email: z.string().email({ message: 'Email invalide' }).optional().or(z.literal('')),
    phone: z.string().max(50, { message: 'Maximum 250 caractères' }).optional().or(z.literal('')),
    position: z.string().max(250, { message: 'Maximum 250 caractères' }).optional().or(z.literal('')),
    companyId: z.string().max(250, { message: 'Maximum 250 caractères' }).optional().or(z.literal('')),
    assignedToId: z.string().max(250, { message: 'Maximum 250 caractères' }).optional().or(z.literal('')),
    tenantId: z.string().max(250, { message: 'Maximum 250 caractères' }),
    statusId: z.string().max(250, { message: 'Maximum 250 caractères' }),
})

const form = ref<ContactFormData>({
    firstName: props.modelValue?.firstName ?? '',
    lastName: props.modelValue?.lastName ?? '',
    email: props.modelValue?.email ?? '',
    phone: props.modelValue?.phone ?? '',
    position: props.modelValue?.position ?? '',
    companyId: props.modelValue?.companyId ?? '',
    assignedToId: props.modelValue?.assignedToId ?? '',
    tenantId: props.modelValue?.tenantId ?? '',
    statusId: props.modelValue?.statusId ?? '',
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

onMounted(async () => {
    try {
        const response = await apiFetch(API_ROUTES.models.tenants.index({ limit: -1 })) as any
        tenant.value = response[0]
    } catch (error) {
        console.error('Erreur lors du fetch des tenants:', error)
    }
    try {
        // FIXME: peut être venir d'un local storage
        const me = await apiFetch(API_ROUTES.auth.me) as Me;
        const response = await apiFetch(API_ROUTES.models.tenants.userByTenant(me.tenantId)) as UserResource
        users.value = response.items
    } catch (error) {
        console.error('Erreur lors du fetch des utilisateurs:', error)
    }
    try {
        const response = await apiFetch(API_ROUTES.models.companies.index({ limit: -1 })) as CompanyResource
        companies.value = response.items
    } catch (error) {
        console.error('Erreur lors du fetch des entreprises:', error)
    }
    try {
        const response = await apiFetch(API_ROUTES.models.statuses.index({ limit: -1 })) as StatusResource
        statuses.value = response.items
    } catch (error) {
        console.error('Erreur lors du fetch des statuts:', error)
    }
})

async function onSubmit() {
    if (!isEditable.value) return;
    form.value.tenantId = tenant.value.id
    errors.value = {}
    const result = contactSchema.safeParse(form.value)
    if (!result.success) {
        for (const issue of result.error.issues) {
            const fieldName = issue.path[0] as keyof ContactFormData
            errors.value[fieldName] = issue.message
        }
        return
    }
    const createUrl = API_ROUTES.models.contacts.create;

    const updateUrl = API_ROUTES.models.contacts.update(route.params.id as string);
    try {
        const response = await apiFetch(isEdit.value ? updateUrl : createUrl, {
            method: isEdit.value ? 'PUT' : 'POST',
            body: JSON.stringify(form.value)
        })
        toast.success(t('global.toast.title.success'), {
            description: isEdit.value ? str(t('global.toast.description.updated_model', { model: t(`model.${props.model}.name`) })).capitalize().value() : str(t('global.toast.description.created_model', { model: t(`model.${props.model}.name`) })).capitalize().value( ),
        })
        const redirectUrl = getDashboardIndex(props.model);
        router.push(redirectUrl);
    } catch (error) {
        toast.error(t('global.toast.title.error'), {
            description: t('global.toast.description.error_creation'),
        })

    }
}
</script>