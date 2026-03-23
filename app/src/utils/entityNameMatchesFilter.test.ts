import { describe, it, expect } from 'vitest'
import { entityNameMatchesFilter } from './entityNameMatchesFilter'

describe('entityNameMatchesFilter', () => {
  it('возвращает true при пустом фильтре и непустом имени', () => {
    expect(entityNameMatchesFilter('Pizza', '')).toBe(true)
    expect(entityNameMatchesFilter('Pizza', '   ')).toBe(true)
  })

  it('подстрочный поиск без учёта регистра', () => {
    expect(entityNameMatchesFilter('Ghost Pepper', 'ghost')).toBe(true)
    expect(entityNameMatchesFilter('GHOST', 'gho')).toBe(true)
  })

  it('возвращает false если имя пустое', () => {
    expect(entityNameMatchesFilter('', 'x')).toBe(false)
    expect(entityNameMatchesFilter('   ', 'x')).toBe(false)
  })

  it('возвращает false если подстрока не найдена', () => {
    expect(entityNameMatchesFilter('Apple', 'banana')).toBe(false)
  })
})
