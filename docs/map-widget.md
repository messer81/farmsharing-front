# Map Widget Guide

## Overview
Google Maps widget displays farms by geo-coordinates with Advanced Markers and an info window. Data comes from `data/farms.json` via Express endpoints.

## Installation

1) Dependencies (уже добавлены):
- @react-google-maps/api

2) .env (frontend):
```
VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY
# Optional, recommended for styles/advanced features
VITE_GOOGLE_MAPS_MAP_ID=YOUR_MAP_ID
```

## Endpoints
- GET /api/farms?north=..&south=..&east=..&west=..&search=..
- GET /api/farms/:id

Источник данных: `data/farms.json`.

## Widget location
- Компонент: `src/widgets/map/ui/FarmMap.tsx`
- Встроен на домашней странице между блоками `FarmProfiles` и «Why Choose Us» (`src/pages/HomePage.tsx`).

## How it works
- Карта грузится через `useJsApiLoader`.
- На событие `onIdle` вычисляются текущие границы карты и выполняется запрос `useGetFarmsByBoundsQuery`.
- Маркеры: AdvancedMarkerElement создаются вручную (без deprecation warning).
- По клику по маркеру открывается `InfoWindow` с фото, названием, локацией и рейтингом + кнопка «Открыть ферму» (`/farm/:id`).

## Styling
- Высота контейнера карты задаётся через MUI `sx` (360–420px). Перенос базовых значений в тему допускается.

## Troubleshooting
- ApiTargetBlockedMapError: убедитесь, что карте задана высота и она не перекрыта элементами.
- Предупреждение про google.maps.Marker устранено использованием Advanced Markers.
- Сообщение "The map is initialized without a valid Map ID": добавьте `VITE_GOOGLE_MAPS_MAP_ID`.

## Code pointers
- RTK Query farms API: `src/entities/farm/model/rtkApi.ts` (`getFarmsByBounds`).
- JSON «БД» ферм: `data/farms.json` и модуль `data/farmDatabase.cjs`.


