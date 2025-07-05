<template>
    <template>
        <div :class="cn(field.inputType === inputTypes.hidden && 'hidden')">
            <!-- <Dropzone v-if="field.inputType === inputTypes.file && variant === 'dropzone'" :field="field"
                :fieldName="fieldName" :required="required" /> -->
            <div :class="cn(
                (field.inputType === inputTypes.checkbox || field.inputType === inputTypes.switch) && 'flex flex-row items-center gap-3 space-x-3 space-y-0 rounded-md border p-4',
                group?.error && 'border-red-500',
                group.className
            )">
                <div :class="cn((field.inputType === inputTypes.checkbox || field.inputType === inputTypes.switch) && 'order-2')">
                    <div>
                        <Label v-if="group.label" :for="fieldName" :class="cn(group.error && 'text-destructive')">
                            {{ group.label }}
                            <span v-if="required">*</span>
                        </Label>
                        <p v-if="group.description" class="text-sm text-muted-foreground">
                            {{ group.description }}
                        </p>
                    </div>
                </div>

                <InputField :field="field" :required="required" :group="group"
                    :fieldName="fieldName" :charCount="charCount" :setCharCount="setCharCount" />
                <small v-if="field?.charCount" class="text-muted-foreground text-xs">
                    {{ charCount }} / {{ field.charCount }} max.
                </small>
            </div>

            <InputError :message="group.error" class="mt-2 font-semibold" />
        </div>
    </template>
</template>


<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import InputError from './InputError.vue'
import InputField from './InputField.vue'
import { inputTypes, type PhilInputProps } from '~/types/inputs';


const props = defineProps<PhilInputProps>()

const { group, field, fieldName, required } = toRefs(props)

const charCount = ref(0)
const setCharCount = (count: number) => {
    charCount.value = count
}

const variant = computed(() => field.value?.file?.variant ?? 'default')
</script>