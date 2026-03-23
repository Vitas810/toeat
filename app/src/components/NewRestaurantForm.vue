<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { Restaurant } from '../types'
import { restaurantStatusList } from '../constants'
import { ref, onMounted } from 'vue'

const emits = defineEmits<{
  (e: 'add-new-restaurant', restaurant: Restaurant): void
  (e: 'cancel-new-restaurant'): void
}>()

/* =============== Ссылки на DOM =============== */
const elNameInput = ref<HTMLInputElement | null>(null)

/* =============== Черновик нового ресторана =============== */
const newRestaurant = ref<Restaurant>({
  id: uuidv4(),
  name: '',
  address: '',
  website: '',
  status: restaurantStatusList[0],
})

// Отправка формы родителю
const addNewRestaurant = () => {
  emits('add-new-restaurant', newRestaurant.value)
}

// Закрытие формы
const cancelNewRestaurant = () => {
  emits('cancel-new-restaurant')
}

/* =============== Жизненный цикл =============== */
onMounted(() => {
  elNameInput.value?.focus()
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="restaurant-name" class="label">Name</label>
        <div class="control">
          <input
            id="restaurant-name"
            v-model="newRestaurant.name"
            ref="elNameInput"
            type="text"
            class="input is-large"
            placeholder="Beignet and the Jets"
            required
          />
        </div>
      </div>
      <div class="field">
        <label for="restaurant-address" class="label">Address</label>
        <div class="control">
          <input
            id="restaurant-address"
            v-model="newRestaurant.address"
            type="text"
            class="input"
            placeholder="123 Main St."
            required
          />
        </div>
      </div>
      <div class="field">
        <label for="restaurant-website" class="label">Website</label>
        <div class="control">
          <input
            id="restaurant-website"
            v-model="newRestaurant.website"
            type="text"
            class="input"
            placeholder="www.beignetandthejets.com"
          />
        </div>
      </div>
      <div class="field mb-5">
        <label for="status" class="label">Status</label>
        <div class="select">
          <select id="status" v-model="newRestaurant.status">
            <option v-for="status in restaurantStatusList" :key="`option-${status}`" :value="status">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button type="button" @click="addNewRestaurant" class="button is-success">Create</button>
          <button type="button" @click="cancelNewRestaurant" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
