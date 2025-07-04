<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const props = defineProps<{
  open: boolean
  title: string
  description: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

function handleOpenChange(val: boolean) {
  emit('update:open', val)
  if (!val) emit('cancel')
}
function handleConfirm() {
  emit('confirm')
  emit('update:open', false)
}
function handleCancel() {
  emit('cancel')
  emit('update:open', false)
}
</script>

<template>
  <AlertDialog :open="props.open" @update:open="handleOpenChange">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ props.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ props.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="props.loading" @click="handleCancel">Annuler</AlertDialogCancel>
        <AlertDialogAction :disabled="props.loading" @click="handleConfirm">Confirmer</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>