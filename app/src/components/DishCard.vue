<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Dish } from '../types'
import { statusTagBulmaClass } from '../constants'

const props = defineProps({
  dish: {
    type: Object as PropType<Dish>,
    required: true,
  },
})

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
  <article class="box">
    <div class="media">
      <aside class="media-left">
        <img src="https://placehold.jp/150x150.png" alt="" />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-1">
          {{ dish.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ dish.status }}</span>
        </p>
        <div>
          <button type="button" @click="deleteDish" class="button is-small is-danger is-light">Delete</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
