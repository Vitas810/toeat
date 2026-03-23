import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRestaurantStore } from './RestaurantStore'

describe('useRestaurantStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('содержит начальные рестораны', () => {
    const store = useRestaurantStore()
    expect(store.restaurants.length).toBeGreaterThan(0)
  })

  it('addRestaurant добавляет элемент', () => {
    const store = useRestaurantStore()
    const before = store.restaurants.length
    store.addRestaurant({
      id: 'test-restaurant-id',
      name: 'Test Place',
      address: '1 Test St',
      website: 'test.example',
      status: 'Recommended',
    })
    expect(store.restaurants.length).toBe(before + 1)
    expect(store.restaurants.some((r) => r.id === 'test-restaurant-id')).toBe(true)
  })

  it('deleteRestaurantById удаляет по id', () => {
    const store = useRestaurantStore()
    const id = store.restaurants[0].id
    store.deleteRestaurantById(id)
    expect(store.restaurants.some((r) => r.id === id)).toBe(false)
  })
})
