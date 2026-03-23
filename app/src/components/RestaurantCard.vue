<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Restaurant } from '../types'
import { statusTagBulmaClass } from '../constants'

const props = defineProps({
  restaurant: {
    type: Object as PropType<Restaurant>,
    required: true,
  },
})

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
  <article class="box">
    <div class="media">
      <aside class="media-left">
        <img src="https://placehold.jp/150x150.png" alt="" />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-1">
          {{ restaurant.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ restaurant.status }}</span>
        </p>
        <div class="content mb-2">
          {{ restaurant.address }}
        </div>
        <div>
          <button type="button" @click="deleteRestaurant" class="button is-small is-danger is-light">Delete</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
