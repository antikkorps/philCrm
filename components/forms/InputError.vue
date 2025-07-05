<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  message?: string
  class?: string
}>()

const classes = computed(() => `text-sm text-red-600 ${props.class ?? ''}`)
</script>

<template>
  <p v-if="message" :class="classes">
    {{ message }}
  </p>
</template>