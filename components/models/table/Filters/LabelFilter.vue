<script setup lang="ts">
const props = defineProps<{
  label: string,
  labelFor?: string,
}>()
</script>

<template>
  <Label :for="labelFor" class="mb-3 text-sm font-semibold">{{ label }}</Label>
</template>
