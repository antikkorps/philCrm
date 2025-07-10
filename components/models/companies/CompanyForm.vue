<template>
    <form @submit.prevent="onSubmit" class="space-y-4 border px-4 md:px-8 py-12 rounded-lg">
        <div class="grid md:grid-cols-2 gap-4">
            <PhilInput :field="{
                inputType: 'text',
                disabled: !isEditable,
                data: form.name,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                    },
                    placeholder: str($t('attributes.name.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.name.name')).capitalize().value(),
                error: errors.name
            }" fieldName="name" :required="true"  />

            <PhilInput :field="{
                inputType: 'text',
                disabled: !isEditable,
                data: form.client_number,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.client_number.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.client_number.name')).capitalize().value(),
                error: errors.client_number
            }" fieldName="client_number" :required="false" />


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
                inputType: 'text',
                data: form.client_group,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.client_group.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.client_group.name')).capitalize().value(),
                error: errors.client_group
            }" fieldName="client_group" :required="false" />



        </div>

        <div class="grid md:grid-cols-3 gap-4">
            <PhilInput :field="{
                inputType: 'url',
                data: form.website,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.website.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.website.name')).capitalize().value(),
                error: errors.website
            }" fieldName="website" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                data: form.industry,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.industry.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.industry.name')).capitalize().value(),
                error: errors.industry
            }" fieldName="industry" :required="false" />
            <PhilInput :field="{
                inputType: 'select',
                data: form.statusId,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.status.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
                options: statuses.map(status => ({
                    label: status.name,
                    value: status.id
                })),
            }" :group="{
                label: str($t('attributes.status.name')).capitalize().value(),
                error: errors.statusId,
            }" fieldName="statusId" :required="true" />


        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <PhilInput :field="{
                inputType: 'number',
                data: form.globalRevenue,
                number: {
                    max: 1000000000000 // FIXME: a devinir,
                },
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.globalRevenue.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.globalRevenue.name')).capitalize().value(),
                error: errors.globalRevenue,
            }" fieldName="globalRevenue" :required="false" />
            <PhilInput :field="{
                inputType: 'text',
                data: form.size,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.size.placeholder', { of: $t('global.article.of'), article: '' , model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.size.name')).capitalize().value(),
                error: errors.size
            }" fieldName="size" :required="false" />

        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <PhilInput :field="{
                inputType: 'text',
                data: form.address,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.address.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.address.name')).capitalize().value(),
                error: errors.address
            }" fieldName="address" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                data: form.address_complement,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.address_complement.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.address_complement.name')).capitalize().value(),
                error: errors.address_complement
            }" fieldName="address_complement" :required="false" />

        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PhilInput :field="{
                inputType: 'text',
                data: form.city,
                disabled: !isEditable,
                    setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.city.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.city.name')).capitalize().value(),
                error: errors.city
            }" fieldName="city" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                data: form.zipCode,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.zipCode.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.zipCode.name')).capitalize().value(),
                error: errors.zipCode
            }" fieldName="zipCode" :required="false" />

            <PhilInput :field="{
                inputType: 'text',
                data: form.code_regional,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.code_regional.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.code_regional.name')).capitalize().value(),
                error: errors.code_regional
            }" fieldName="code_regional" :required="false" />
            <PhilInput :field="{
                inputType: 'text',
                data: form.country,
                disabled: !isEditable,
                setData: (key: string, value: any) => {
                    (form as any)[key] = value
                },
                placeholder: str($t('attributes.country.placeholder', { of: $t('global.article.of'), article: '', model: joinArticle($t('global.article.the_s'), $t(`model.${model}.name`)) })).capitalize().value(),
            }" :group="{
                label: str($t('attributes.country.name')).capitalize().value(),
                error: errors.country
            }" fieldName="country" :required="false" />

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
import type { Company } from '~/types/company';
import { z } from 'zod'
import Button from '~/components/ui/button/Button.vue';
import { API_ROUTES } from '~/configs/routes';
import { apiFetch } from '~/utils/api';
import type { Status, StatusResource } from '~/types/status';
import type { Me, User, UserResource } from '~/lib/types/auth';
import { toast } from 'vue-sonner';
import { CrudActionsEnums } from '~/enums/actions';
import { str } from '~/lib/str';
import { joinArticle } from '~/lib/utils';
import { getDashboardIndex } from '~/utils/dashboardModelRoutes';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const router = useRouter()
const props = defineProps<{
    modelValue?: Company | null
    action: CrudActionsEnums
    model: string
}>()

const isEditable = computed(() => props.action === CrudActionsEnums.Edit || props.action === CrudActionsEnums.Create)
type CompanyFormData = z.infer<typeof companySchema>
const statuses = ref<Status[]>([])
const tenant = ref<any>()
const users = ref<User[]>([])
const emit = defineEmits(['submitted']);
const errors = ref<Partial<Record<keyof CompanyFormData, string>>>({})
const route = useRoute()
const isEdit = computed(() => props.action === CrudActionsEnums.Edit)


const companySchema = z.object({
    name: z.string().max(250, { message: 'Maximum 250 caractères' }),
    website: z.string().url({ message: 'URL invalide' }).optional().or(z.literal('')),
    industry: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(),
    client_group: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(), // FIXME: pas encore ajouté il faut voir d'où vient l'info
    client_number: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(),
    statusId: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }),
    assignedToId: z.string().min(10, { message: 'Minimum 10 caractères' }).max(250, { message: 'Maximum 250 caractères' }).nullable(), // FIXME: voir d'où vient l'info
    globalRevenue: z.number().nullable(), // il est nullable
    address: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(),
    address_complement: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(),
    city: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(),
    zipCode: z.string().max(10, { message: 'Maximum 10 caractères' }).nullable(),
    code_regional: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(),
    country: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(),
    size: z.string().max(250, { message: 'Maximum 250 caractères' }).nullable(),
    tenantId: z.string().max(250, { message: 'Maximum 250 caractères' }),
})

const form = ref<CompanyFormData>({
    name: props.modelValue?.name ?? '',
    website: props.modelValue?.website ?? '',
    industry: props.modelValue?.industry ?? '',
    client_group: props.modelValue?.client_group ?? '',
    client_number: props.modelValue?.client_number ?? '',
    statusId: props.modelValue?.statusId ?? '',
    assignedToId: props.modelValue?.assignedToId ?? '',
    globalRevenue: props.modelValue?.globalRevenue ?? null,
    address: props.modelValue?.address ?? '',
    address_complement: props.modelValue?.address_complement ?? '',
    city: props.modelValue?.city ?? '',
    zipCode: props.modelValue?.zipCode ?? '',
    code_regional: props.modelValue?.code_regional ?? '',
    country: props.modelValue?.country ?? '',
    tenantId: props.modelValue?.tenantId ?? '',
    size: props.modelValue?.size ?? '',
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
        const response = await apiFetch(API_ROUTES.models.status.index({ limit: -1 })) as StatusResource
        statuses.value = response.items
    } catch (error) {
        console.error('Erreur lors du fetch des statuts:', error)
    }
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
})

async function onSubmit() {
    if (!isEditable.value) return;
    form.value.tenantId = tenant.value.id
    errors.value = {}
    const result = companySchema.safeParse(form.value)
    if (!result.success) {
        for (const issue of result.error.issues) {
            const fieldName = issue.path[0] as keyof CompanyFormData
            errors.value[fieldName] = issue.message
        }
        return
    }
    const createUrl = API_ROUTES.models.companies.create;

    const updateUrl = API_ROUTES.models.companies.update(route.params.id as string);
    try {
        await apiFetch(isEdit.value ? updateUrl : createUrl, {
            method: isEdit.value ? 'PUT' : 'POST',
            body: JSON.stringify(form.value)
        })
        toast.success(t('global.toast.title.success'), {
            description: isEdit.value ? str(t('global.toast.description.updated_model', { model: t(`model.${props.model}.name`) })).capitalize().value() : str(t('global.toast.description.created_model', { model: t(`model.${props.model}.name`) })).capitalize().value( ),
        })
        const redirectUrl = getDashboardIndex(props.model);
        router.push(redirectUrl);
    } catch (err) {
        toast.error(t('global.toast.title.error'), {
            description: t('global.toast.description.error_creation'),
        })
        
    }
}
</script>