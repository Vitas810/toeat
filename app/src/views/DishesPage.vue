<script lang="ts" setup>
import NewDishForm from '../components/NewDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { computed, onMounted, ref } from 'vue'
import type { Dish } from '../types'
import { useRoute } from 'vue-router'
import { useDishStore } from '@/stores/DishStore'
import { entityNameMatchesFilter } from '@/utils/entityNameMatchesFilter'

/* =============== Состояние страницы =============== */
const dishStore = useDishStore()
const route = useRoute()
const filterText = ref('')
const showNewForm = ref(false)

/* =============== Вычисляемые списки =============== */
const filteredDishList = computed((): Dish[] => {
  return dishStore.dishes.filter((dish) => entityNameMatchesFilter(dish.name, filterText.value))
})

const numberOfDishes = computed((): number => filteredDishList.value.length)

const hasNoDishes = computed(() => dishStore.dishes.length === 0)

const hasNoSearchResults = computed(() => dishStore.dishes.length > 0 && filteredDishList.value.length === 0)

/* =============== Действия =============== */
const addDish = (payload: Dish) => {
  dishStore.addDish(payload)
  hideForm()
}

const deleteDish = (payload: Dish) => {
  dishStore.deleteDishById(payload.id)
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
            <h1 class="title is-2 app-page__title app-font-display">Dishes</h1>
            <p class="subtitle is-6 app-page__intro">Track dishes you crave, recommend, or want to skip.</p>
          </header>

          <nav v-if="!showNewForm" class="app-page__toolbar" aria-label="Действия и поиск по блюдам">
            <p class="subtitle is-5 app-page__meta">
              <strong>{{ numberOfDishes }}</strong> dishes
            </p>
            <button type="button" class="button is-success" @click="showNewForm = true">New</button>
            <div class="field has-addons app-page__search">
              <p class="control is-expanded">
                <input
                  v-model="filterText"
                  class="input"
                  type="search"
                  placeholder="Filter by dish name"
                  aria-label="Фильтр по названию блюда"
                />
              </p>
              <p class="control">
                <span class="button is-static" aria-hidden="true">Search</span>
              </p>
            </div>
          </nav>

          <NewDishForm v-if="showNewForm" @add-new-dish="addDish" @cancel-new-dish="hideForm" />

          <div v-else-if="hasNoDishes" class="app-empty" role="status">
            <p class="app-empty__icon" aria-hidden="true">
              <span class="fa fa-coffee"></span>
            </p>
            <p class="app-empty__text">No dishes yet. Use <strong>New</strong> to log the first one.</p>
          </div>

          <div v-else-if="hasNoSearchResults" class="notification is-warning is-light app-alert--warning" role="status">
            No dishes match your search.
          </div>

          <div v-else class="columns is-multiline app-card-list">
            <div v-for="item in filteredDishList" :key="item.id" class="column is-full">
              <DishCard :dish="item" @delete-dish="deleteDish" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
