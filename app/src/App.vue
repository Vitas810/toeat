<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="app-shell">
    <TheNavbar tagline="Track whatever you want to eat" />
    <div class="app-shell__main">
      <RouterView />
    </div>
    <TheFooter />
  </div>
</template>

<style></style>
