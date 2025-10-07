# 🚀 Настройка GitHub Pages для React приложения

## Шаг 1: Включение GitHub Pages

1. **Перейдите в репозиторий** на GitHub: `https://github.com/Drimodaren/frontend-test-task-axon`

2. **Откройте Settings (Настройки)**:
   - Нажмите на вкладку `⚙️ Settings` в верхней части репозитория

3. **Найдите раздел Pages**:
   - В левом меню найдите и нажмите `📄 Pages`

4. **Настройте источник**:
   - **Source**: Выберите `GitHub Actions`
   - Это включит автоматическую публикацию через GitHub Actions

## Шаг 2: Автоматическая публикация (уже настроено)

✅ **GitHub Actions настроен**: Файл `.github/workflows/deploy.yml` уже создан и настроен.

### Что происходит автоматически:

1. **При пуше в main ветку** запускается workflow
2. **Устанавливаются зависимости**: `npm ci`
3. **Проверяется код**: `npm run lint` и `tsc --noEmit`
4. **Собирается приложение**: `npm run build`
5. **Публикуется на GitHub Pages** в автоматическом режиме

## Шаг 3: Проверка публикации

После пуша в main ветку:

1. **Перейдите в Actions**:
   - Нажмите вкладку `⚡ Actions` в репозитории
   - Убедитесь, что workflow `Deploy to GitHub Pages` выполняется/выполнился успешно

2. **Дождитесь завершения**:
   - Процесс занимает обычно 2-5 минут
   - Зеленая галочка ✅ означает успешную публикацию

3. **Откройте приложение**:
   - URL: `https://drimodaren.github.io/frontend-test-task-axon/`
   - Приложение будет доступно через несколько минут после публикации

## Шаг 4: Проверка работоспособности

После публикации приложение должно:

✅ **Отображать главную страницу** со списком типов продуктов (mock данные)  
✅ **Работать навигация** между страницами  
✅ **Функционировать формы** создания и редактирования  
✅ **Корректно работать удаление**  

> **Примечание**: В продакшене используются mock данные, так как API сервер недоступен на GitHub Pages.

## Troubleshooting (Устранение проблем)

### Если приложение не открывается:

1. **Проверьте Actions**:
   ```
   GitHub → Repository → Actions → Deploy to GitHub Pages
   ```
   Убедитесь, что нет ошибок в workflow

2. **Проверьте настройки Pages**:
   ```
   GitHub → Repository → Settings → Pages
   Source: GitHub Actions ✅
   ```

3. **Проверьте URL**:
   ```
   Корректный: https://drimodaren.github.io/frontend-test-task-axon/
   Некорректный: https://drimodaren.github.io/frontend-test-task-axon (без слеша)
   ```

### Если есть ошибки в workflow:

1. **Проверьте логи Actions**
2. **Убедитесь, что все файлы коммитнуты**
3. **Проверьте права workflow** (Settings → Actions → General → Workflow permissions → Read and write permissions)

## Технические детали

### Конфигурация для GitHub Pages:

- **Base URL**: `/frontend-test-task-axon/` (настроено в `vite.config.ts`)
- **Router basename**: автоматически определяется по окружению
- **API**: В продакшене используются mock данные
- **SPA routing**: Настроен `404.html` для корректной работы роутинга

### Файлы конфигурации:

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `vite.config.ts` - конфигурация сборки для GitHub Pages  
- `public/404.html` - поддержка SPA роутинга
- `.env.production` - переменные окружения для продакшена

---

## 🎉 Готово!

После выполнения этих шагов ваше приложение будет автоматически публиковаться на GitHub Pages при каждом пуше в main ветку.

**URL приложения**: https://drimodaren.github.io/frontend-test-task-axon/