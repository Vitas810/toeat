import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useDishStore } from './DishStore'

describe('useDishStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('содержит начальные блюда', () => {
    const store = useDishStore()
    expect(store.dishes.length).toBeGreaterThan(0)
  })

  it('addDish добавляет элемент', () => {
    const store = useDishStore()
    const before = store.dishes.length
    store.addDish({
      id: 'test-dish-id',
      name: 'Test Dish',
      status: 'Want to Try',
    })
    expect(store.dishes.length).toBe(before + 1)
    expect(store.dishes.some((d) => d.id === 'test-dish-id')).toBe(true)
  })

  it('deleteDishById удаляет по id', () => {
    const store = useDishStore()
    const id = store.dishes[0].id
    store.deleteDishById(id)
    expect(store.dishes.some((d) => d.id === id)).toBe(false)
  })
})
