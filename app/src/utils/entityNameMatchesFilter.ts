/* =============== Фильтрация списков по подстроке имени =============== */

// Проверка: имя сущности содержит текст фильтра (без учёта регистра)
export function entityNameMatchesFilter(name: string, filterText: string): boolean {
  const normalizedName = name.trim().toLowerCase()
  const query = filterText.trim().toLowerCase()
  if (!normalizedName) {
    return false
  }
  if (!query) {
    return true
  }
  return normalizedName.includes(query)
}
