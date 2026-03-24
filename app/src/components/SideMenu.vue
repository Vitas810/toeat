<template>
  <div class="column is-4-tablet is-3-desktop is-2-widescreen app-side-menu">
    <nav class="app-side-menu__panel app-rav-nav" aria-label="Разделы каталога">
      <p class="app-rav-nav__label">Browse</p>
      <ul class="app-rav-nav__list">
        <li class="app-rav-nav__item">
          <router-link class="app-rav-nav__link" to="/dishes">Dishes</router-link>
        </li>
        <li class="app-rav-nav__item">
          <router-link class="app-rav-nav__link" to="/restaurants">Restaurants</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style></style>
