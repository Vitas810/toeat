<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <TheNavbar tagline="Track whatever you want to eat" />
  <RouterView />
  <TheFooter />
</template>

<style></style>
