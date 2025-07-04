<script setup lang="ts">
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { inputTypes, type Field, type InputType, type PhilInputProps } from '~/types/inputs';
import { cn } from '~/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-vue-next';

const props = defineProps<{
    field: Field
    fieldName: string
    required?: boolean
    setCharCount?: (count: number) => void
    group?: PhilInputProps['group']
    charCount?: number
}>()


const modelValue = computed({
    get: () => props.field.data,
    set: (val) => {
        if (props.field.setData) {
            props.field.setData(props.fieldName, val)
        }
    }
})

function onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value
    if (props.field.inputType === inputTypes.hidden) return
    if (props.field.handleInput) {
        props.field.handleInput(e)
    }
    if (props.field.inputType === inputTypes.text && props.setCharCount) {
        props.setCharCount(value.length)
    }
}

const inputBaseTypesSupported: InputType[] = [
    inputTypes.text,
    inputTypes.email,
    inputTypes.password,
    inputTypes.number,
    inputTypes.url,
    inputTypes.hidden,
    inputTypes.date,
]


</script>

<template>
    <Input v-if="inputBaseTypesSupported.includes(field.inputType)" :type="field.inputType" :id="fieldName"
        :name="fieldName" :disabled="field.disabled" :placeholder="field.placeholder || ''"
        :class="cn('mt-2 block w-full py-3 border ', group?.error && 'border-red-500')"
        :min="field.inputType === inputTypes.number ? field.number?.min || 0 : undefined"
        :max="field.inputType === inputTypes.number ? field.number?.max || 1000 : undefined"
        :step="field.inputType === inputTypes.number ? field.number?.step || 1 : undefined" v-model="modelValue"
        :required="required" :readonly="field.inputType === inputTypes.hidden" @input="onInput" />

    <Select 
    
    v-else-if="field.inputType === inputTypes.select" v-model="modelValue">
        <SelectTrigger 
        :disabled="field.disabled"
        :class="cn('w-full mt-2', group?.error && 'border-red-500')">
            <SelectValue :placeholder="field.placeholder || 'Sélectionner...'" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectItem v-for="option in field.options || []" :key="option.value" :value="option.value">
                    {{ option.label }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>

    <Checkbox :id="fieldName" :name="fieldName" :disabled="field.disabled"
        v-else-if="field.inputType === inputTypes.checkbox" :model-value="modelValue" @update:model-value="(e) => {
            if (field.setData) {
                field.setData(fieldName, e);
            }
            field.handleInput && field.handleInput(e);
        }" />

    <Textarea v-else-if="field.inputType === inputTypes.textarea" :id="fieldName" :name="fieldName"
        :class="cn('mt-2 block w-full border ', group?.error && 'border-red-500')" :disabled="field.disabled"
        :model-value="modelValue" @update:model-value="(e) => {
            if (field.setData) {
                field.setData(fieldName, e);
            }
            field.handleInput && field.handleInput(e);
            setCharCount && setCharCount(String(e).length);
        }" />

    <PinInput v-else-if="field.inputType === inputTypes.otp" :id="fieldName" :model-value="modelValue" placeholder="○"
        class="flex gap-2 items-center mt-1'" otp type="text" :name="fieldName" @complete="(e: any) => {
            field.handleInput && field.handleInput(e);
        }" @update:model-value="(e: any) => {
            if (field.setData) {
                field.setData(fieldName, e);
            }
        }" :disabled="field.disabled">
        <PinInputGroup>
            <PinInputSlot :class="cn(group?.error && 'border border-red-500')" v-for="(id, index) in 5" :key="id"
                :index="index" />
        </PinInputGroup>
    </PinInput>
    <Input v-if="field.inputType === inputTypes.file" type="file" :id="fieldName" :name="fieldName"
        :disabled="field.disabled" :placeholder="field.placeholder || ''"
        :class="cn('mt-2 block w-full border ', group?.error && 'border-red-500')"
        :multiple="field?.file?.multiple || false" :required="required" @input="(e: Event) => {
            const input = e.target as HTMLInputElement;
            const multiple = field?.file?.multiple || false;
            let files = null;

            if (multiple) {
                files = input.files
                    ? Array.from(input.files).map((file) => file)
                    : null;
            } else {
                const file = input.files
                    ? input.files[0]
                    : null;
                files = file;
            }

            if (field.setData) {
                field.setData(fieldName, files);
            }
            field.handleInput && field.handleInput(e);
        }" :accept="field?.file?.accept || 'image/*, application/pdf'" />

    <Switch v-else-if="field.inputType === inputTypes.switch" :id="fieldName" class="cursor-pointer" :name="fieldName"
        :required="required" :model-value="modelValue" value="true" @update:model-value="(e) => {
            field.handleInput
                ? field.handleInput(e)
                : field.setData && field.setData(fieldName, e);
        }" />





    <Combobox v-if="field.inputType === inputTypes.combobox" :model-value="field.data" @update:model-value="(e) => {
        if (field.setData) {
            field.setData(fieldName, e)
        }
    }" by="value">
        <ComboboxAnchor :class="cn('w-full border rounded-md', group?.error && 'border-red-500')">
            <div class="relative w-full items-center">
                <ComboboxInput :display-value="(val) => {
                    const found = (field.options || []).find(opt => opt.value === val)
                    return found ? found.label : ''
                }" :placeholder="field.placeholder || 'Sélectionner...'" 
                class="w-full"
                />
                <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-start px-3">
                    <ChevronsUpDown class="size-4 text-muted-foreground" />
                </ComboboxTrigger>
            </div>
        </ComboboxAnchor>

        <ComboboxList align="start">
            <ComboboxEmpty>
                Nothing found.
            </ComboboxEmpty>
            <ComboboxGroup>
                <ComboboxItem v-for="option in field.options || []" :key="option.value" :value="option.value">
                    {{ option.label }}
                    <ComboboxItemIndicator>
                        <Check :class="cn('ml-auto h-4 w-4')" />
                    </ComboboxItemIndicator>
                </ComboboxItem>
            </ComboboxGroup>
        </ComboboxList>
    </Combobox>

    <!-- TODO: ajouter wisiwig + Dropzone -->
</template>