# Лабораторная работа 4

## Задание

Вариант 13. Игры и платформы.
- 4.1. Создать класс Game с полями title, platforms, releaseYear. Методы: addPlatform, removePlatform, геттер platformCount.
- 4.2. Функции коллекций: groupGamesByReleaseYear, getUniquePlatforms, findGamesByPlatform, groupGamesByPlatformCount, findGamesReleasedAfter.
- 4.3. Пользовательский интерфейс: карточки игр, формы и кнопки добавления/удаления с асинхронным обновлением через Promise и setTimeout, сохранение состояния в localStorage.

## Реализация

- Реализован класс `Game` в `model.js` со всеми методами мутации платформ и вычисляемым геттером `platformCount`.
- Реализованы 5 чистых функций агрегации и фильтрации без изменения входных коллекций.
- Разметка `index.html` и стили `styles.css` реализуют публичный DOM-контракт: `[data-testid="entity-list"]`, `form[data-testid="entity-form"]`, `[data-testid="entity-card"]`, `[data-testid="delete-entity"]`.
- Все операции модификации данных в `main.js` выполняются асинхронно через обёртки с `Promise` и `setTimeout`.
- Состояние сохраняется в `localStorage` и восстанавливается после перезагрузки страницы.

## Запуск

Откройте `index.html` в браузере или запустите локальный статический сервер.
