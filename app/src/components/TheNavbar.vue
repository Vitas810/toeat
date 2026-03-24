<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  tagline: string | number
}>()

/* =============== Пункты навигации =============== */
const navList = ref([
  { name: 'Home', path: '/' },
  { name: 'Restaurants', path: '/restaurants' },
  { name: 'Dishes', path: '/dishes' },
])

/* =============== Мобильное меню =============== */
const isMenuExpanded = ref(false)

// Переключение бургер-меню
function toggleMenu(): void {
  isMenuExpanded.value = !isMenuExpanded.value
}

// Закрытие меню после перехода
function closeMenu(): void {
  isMenuExpanded.value = false
}
</script>

<template>
  <nav class="navbar has-shadow app-navbar" role="navigation" aria-label="Основная навигация">
    <div class="container app-navbar__inner">
      <div class="navbar-brand">
        <RouterLink
          to="/"
          class="navbar-item app-navbar__brand"
          active-class=""
          exact-active-class=""
          @click="closeMenu"
        >
          <img src="@/assets/to-eat-logo.svg" alt="ToEat — на главную" width="108" height="28" />
        </RouterLink>
        <button
          type="button"
          class="navbar-burger"
          :class="{ 'is-active': isMenuExpanded }"
          aria-label="Открыть меню"
          :aria-expanded="isMenuExpanded"
          @click="toggleMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isMenuExpanded }">
        <div class="navbar-start">
          <div class="navbar-item app-navbar__tagline">
            <span>{{ tagline }}</span>
          </div>
        </div>
        <div class="navbar-end">
          <RouterLink
            v-for="navItem in navList"
            :key="`nav-${navItem.name}`"
            class="navbar-item"
            :to="navItem.path"
            @click="closeMenu"
          >
            {{ navItem.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style></style>
