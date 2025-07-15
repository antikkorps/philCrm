<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// On découpe l'URL en morceaux pour construire les breadcrumbs
const segments = computed(() => {
  return route.path
    .split('/')
    .filter(Boolean) // enlève les segments vides
    .map((segment, index, array) => {
      return {
        name: decodeURIComponent(segment),
        path: '/' + array.slice(0, index + 1).join('/')
      }
    })
})
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol>
      <li v-for="(segment, index) in segments" :key="index">
        <NuxtLink :to="segment.path">
          {{ segment.name }}
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>