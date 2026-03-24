<script lang="ts" setup>
import NewRestaurantForm from '../components/NewRestaurantForm.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { computed, onMounted, ref } from 'vue'
import type { Restaurant } from '../types'
import { useRoute } from 'vue-router'
import { useRestaurantStore } from '@/stores/RestaurantStore'
import { entityNameMatchesFilter } from '@/utils/entityNameMatchesFilter'

/* =============== Состояние страницы =============== */
const restaurantStore = useRestaurantStore()
const route = useRoute()
const filterText = ref('')
const showNewForm = ref(false)

/* =============== Вычисляемые списки =============== */
const filteredRestaurantList = computed((): Restaurant[] => {
  return restaurantStore.restaurants.filter((restaurant) => entityNameMatchesFilter(restaurant.name, filterText.value))
})

const numberOfRestaurants = computed((): number => filteredRestaurantList.value.length)

const hasNoRestaurants = computed(() => restaurantStore.restaurants.length === 0)

const hasNoSearchResults = computed(
  () => restaurantStore.restaurants.length > 0 && filteredRestaurantList.value.length === 0
)

/* =============== Действия =============== */
const addRestaurant = (payload: Restaurant) => {
  restaurantStore.addRestaurant(payload)
  hideForm()
}

const deleteRestaurant = (payload: Restaurant) => {
  restaurantStore.deleteRestaurantById(payload.id)
}

const hideForm = () => {
  showNewForm.value = false
}

/* =============== Жизненный цикл =============== */
onMounted(() => {
  if (route.query.new) {
    showNewForm.value = true
  }
})
</script>

<template>
  <main class="section app-page">
    <div class="container">
      <div class="columns">
        <SideMenu />

        <div class="column">
          <header class="app-page__header">
            <h1 class="title is-2 app-page__title app-font-display">Restaurants</h1>
            <p class="subtitle is-6 app-page__intro">Manage places you want to try or recommend.</p>
          </header>

          <nav v-if="!showNewForm" class="app-page__toolbar" aria-label="Действия и поиск по ресторанам">
            <p class="subtitle is-5 app-page__meta">
              <strong>{{ numberOfRestaurants }}</strong> restaurants
            </p>
            <button type="button" class="button is-success" @click="showNewForm = true">New</button>
            <div class="field has-addons app-page__search">
              <p class="control is-expanded">
                <input
                  v-model="filterText"
                  class="input"
                  type="search"
                  placeholder="Filter by restaurant name"
                  aria-label="Фильтр по названию ресторана"
                />
              </p>
              <p class="control">
                <span class="button is-static" aria-hidden="true">Search</span>
              </p>
            </div>
          </nav>

          <NewRestaurantForm v-if="showNewForm" @add-new-restaurant="addRestaurant" @cancel-new-restaurant="hideForm" />

          <div v-else-if="hasNoRestaurants" class="app-empty" role="status">
            <p class="app-empty__icon" aria-hidden="true">
              <span class="fa fa-cutlery"></span>
            </p>
            <p class="app-empty__text">No restaurants yet. Tap <strong>New</strong> to add your first place.</p>
          </div>

          <div v-else-if="hasNoSearchResults" class="notification is-warning is-light app-alert--warning" role="status">
            No restaurants match your search.
          </div>

          <div v-else class="columns is-multiline app-card-list">
            <div v-for="item in filteredRestaurantList" :key="item.id" class="column is-full">
              <RestaurantCard :restaurant="item" @delete-restaurant="deleteRestaurant" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
