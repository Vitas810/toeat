<script setup lang="ts">
import { computed } from 'vue'
import type { Dish } from '../types'
import { statusTagBulmaClass } from '../constants'
import dishThumbUrl from '@/assets/images/thumb-dish-still-life.png?url'

const props = defineProps<{
  dish: Dish
}>()

const emits = defineEmits<{
  (e: 'delete-dish', dish: Dish): void
}>()

/* =============== Класс тега статуса =============== */
const statusColor = computed(() => statusTagBulmaClass[props.dish.status])

// Удаление карточки
const deleteDish = () => {
  emits('delete-dish', props.dish)
}
</script>

<template>
  <article class="box app-entity-card">
    <div class="media">
      <aside class="media-left">
        <img
          class="app-entity-card__thumb"
          :src="dishThumbUrl"
          width="132"
          height="132"
          alt=""
        />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-2 app-entity-card__title">
          {{ dish.name }}
        </p>
        <p class="subtitle mb-3">
          <span class="tag" :class="statusColor">{{ dish.status }}</span>
        </p>
        <div>
          <button type="button" class="button is-small is-danger is-light" @click="deleteDish">Remove</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
