# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

# Frontend для тестового задания

React приложение для управления типами продукции, созданное с использованием:

- **React 19** с TypeScript
- **Redux Toolkit** для управления состоянием
- **React Hook Form** для работы с формами
- **Vite** как сборщик

## Запуск приложения

### Предварительные требования

- Node.js версии 20.19+ или 22.12+ (для Vite)
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

### Сборка для продакшена

```bash
npm run build
```

### Предварительный просмотр продакшен-сборки

```bash
npm run preview
```

## Важно

Перед запуском фронтенда убедитесь, что API сервер запущен на порту 8081:

```bash
cd ../api
npm install
npm start
```

## Архитектура проекта

```
src/
├── components/     # Переиспользуемые компоненты
├── pages/         # Страницы приложения
├── services/      # API сервисы
├── store/         # Redux store и слайсы
├── types/         # TypeScript типы
├── App.tsx        # Главный компонент
└── main.tsx       # Точка входа
```

## Функциональность

- ✅ Просмотр списка типов продукции
- ✅ Создание новых типов продукции
- ✅ Валидация форм с помощью React Hook Form
- ✅ Управление состоянием через Redux Toolkit
- ✅ TypeScript для типизации
- 🔄 В планах: редактирование, удаление, роутинг

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
