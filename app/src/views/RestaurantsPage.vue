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
  <main class="section">
    <div class="columns">
      <SideMenu />

      <div class="column">
        <h1 class="title">Restaurants</h1>

        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfRestaurants }}</strong> restaurants
              </p>
            </div>

            <p class="level-item">
              <button type="button" @click="showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input v-model="filterText" class="input" type="text" placeholder="Restaurant name" />
                </p>
                <p class="control">
                  <span class="button is-static">Search</span>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <NewRestaurantForm v-if="showNewForm" @add-new-restaurant="addRestaurant" @cancel-new-restaurant="hideForm" />

        <div v-else-if="hasNoRestaurants" class="notification is-light">No restaurants yet. Add one with New.</div>

        <div v-else-if="hasNoSearchResults" class="notification is-warning is-light">
          No restaurants match your search.
        </div>

        <div v-else class="columns is-multiline">
          <div v-for="item in filteredRestaurantList" :key="item.id" class="column is-full">
            <RestaurantCard :restaurant="item" @delete-restaurant="deleteRestaurant" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
