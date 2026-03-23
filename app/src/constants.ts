export const restaurantStatusList = ['Want to Try', 'Recommended', 'Do Not Recommend'] as const

/* =============== Внешний вид тега статуса (Bulma) =============== */
export const statusTagBulmaClass: Record<typeof restaurantStatusList[number], string> = {
  'Want to Try': 'is-warning',
  Recommended: 'is-success',
  'Do Not Recommend': 'is-danger',
}

export const dietList = ['Vegetarian', 'Pescetarian', 'Keto', ''] as const
