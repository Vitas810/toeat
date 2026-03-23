import type { restaurantStatusList, dietList } from './constants'

export type Restaurant = {
  id: string
  name: string
  address: string
  website: string
  status: Status
  diet?: Diet
}

export type Dish = {
  id: string
  name: string
  status: Status
  diet?: Diet
}

export type Status = typeof restaurantStatusList[number]
export type Diet = typeof dietList[number]
