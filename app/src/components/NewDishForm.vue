<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Dish } from '../types'
import { restaurantStatusList } from '../constants'

const emits = defineEmits<{
  (e: 'add-new-dish', dish: Dish): void
  (e: 'cancel-new-dish'): void
}>()

/* =============== Ссылки на DOM =============== */
const elDishNameInput = ref<HTMLInputElement | null>(null)

/* =============== Черновик нового блюда =============== */
const newDish = ref<Dish>({
  id: uuidv4(),
  name: '',
  status: restaurantStatusList[0],
  diet: '',
})

// Отправка формы родителю
const addNewDish = () => {
  emits('add-new-dish', newDish.value)
}

// Закрытие формы
const cancelNewDish = () => {
  emits('cancel-new-dish')
}

/* =============== Жизненный цикл =============== */
onMounted(() => {
  elDishNameInput.value?.focus()
})
</script>

<template>
  <form class="app-form-panel" @submit.prevent>
    <h2 class="title is-5 mb-4">New dish</h2>
    <div class="field">
      <label for="dish-name" class="label">Name</label>
      <div class="control">
        <input
          id="dish-name"
          ref="elDishNameInput"
          v-model="newDish.name"
          type="text"
          class="input is-large"
          placeholder="Mystery Flavored Shrimp"
          required
        />
      </div>
    </div>
    <div class="field">
      <div class="buttons">
        <button type="button" class="button is-success" @click="addNewDish">Create</button>
        <button type="button" class="button is-light" @click="cancelNewDish">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style></style>
