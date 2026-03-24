<script setup lang="ts">
import { computed } from 'vue'
import type { Restaurant } from '../types'
import { statusTagBulmaClass } from '../constants'
import restaurantThumbUrl from '@/assets/images/thumb-restaurant-ambience.png?url'

const props = defineProps<{
  restaurant: Restaurant
}>()

const emits = defineEmits<{
  (e: 'delete-restaurant', restaurant: Restaurant): void
}>()

/* =============== Класс тега статуса =============== */
const statusColor = computed(() => statusTagBulmaClass[props.restaurant.status])

// Удаление карточки
const deleteRestaurant = () => {
  emits('delete-restaurant', props.restaurant)
}
</script>

<template>
  <article class="box app-entity-card">
    <div class="media">
      <aside class="media-left">
        <img
          class="app-entity-card__thumb"
          :src="restaurantThumbUrl"
          width="132"
          height="132"
          alt=""
        />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-2 app-entity-card__title">
          {{ restaurant.name }}
        </p>
        <p class="subtitle mb-3">
          <span class="tag" :class="statusColor">{{ restaurant.status }}</span>
        </p>
        <p class="app-entity-card__address mb-3">
          {{ restaurant.address }}
        </p>
        <div>
          <button type="button" class="button is-small is-danger is-light" @click="deleteRestaurant">Remove</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
