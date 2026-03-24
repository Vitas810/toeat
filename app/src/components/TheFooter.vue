<script setup lang="ts">
/* =============== Год в футере =============== */
const copyrightYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer app-footer">
    <div class="content has-text-centered">
      <p class="app-footer__text">Copyright © {{ copyrightYear }} ToEat. All rights reserved.</p>
    </div>
  </footer>
</template>

<style></style>
