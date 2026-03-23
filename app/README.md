# ToEat — пакет приложения

Корень npm-пакета ToEat. Общее описание, архитектура и таблица скриптов — в **[README репозитория](../README.md)**.

## Команды (из каталога `app/`)

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run test
```

Полная таблица скриптов — в [../README.md](../README.md) (раздел «Скрипты»).

## Структура исходников (`src/`)

| Путь | Роль |
|------|------|
| `main.ts` | Точка входа: Pinia, роутер, глобальные стили |
| `App.vue` | Каркас: навбар, `<RouterView>`, футер |
| `router/` | Таблица маршрутов (ленивые страницы списков) |
| `views/` | Композиция на уровне страниц |
| `components/` | Презентационные компоненты и формы |
| `stores/` | Pinia: `DishStore`, `RestaurantStore` |
| `utils/` | Чистые функции (например фильтрация списков) |
| `types.ts` | Доменные типы (`Restaurant`, `Dish`, `Status`, …) |
| `constants.ts` | Списки статусов + карта классов Bulma для тегов |

## Инструменты

- **Проверка типов**: `vue-tsc` (не голый `tsc`) — поддержка `.vue` SFC.
- **Тесты**: Vitest + jsdom; конфиг — `vitest.config.ts`.
- **Линт**: ESLint использует `.gitignore` в этой папке (`app/.gitignore`).

## IDE

Рекомендуется VS Code + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar); для этого проекта Vetur лучше отключить.
