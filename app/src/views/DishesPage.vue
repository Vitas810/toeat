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
  <main class="section">
    <div class="columns">
      <SideMenu />

      <div class="column">
        <h1 class="title">Dishes</h1>

        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button type="button" @click="showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input v-model="filterText" class="input" type="text" placeholder="Dish name" />
                </p>
                <p class="control">
                  <span class="button is-static">Search</span>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <NewDishForm v-if="showNewForm" @add-new-dish="addDish" @cancel-new-dish="hideForm" />

        <div v-else-if="hasNoDishes" class="notification is-light">No dishes yet. Add one with New.</div>

        <div v-else-if="hasNoSearchResults" class="notification is-warning is-light">No dishes match your search.</div>

        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" :key="item.id" class="column is-full">
            <DishCard :dish="item" @delete-dish="deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
