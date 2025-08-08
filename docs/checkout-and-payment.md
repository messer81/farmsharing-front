# 🧾 Оформление заказа и оплата (Checkout & Payments)

Этот документ описывает полный пользовательский и технический флоу оформления заказа, оплаты картой (Stripe) и подтверждения заказа в приложении FarmSharing.

## 🔍 Обзор флоу

1. Корзина: пользователь проверяет товары и итоговую сумму
2. Доставка: вводит адрес и контактные данные
3. Оплата: выбирает способ (наложенный платёж, карта Stripe, PayPal — placeholder)
4. Подтверждение: заказ создан, корзина очищена, показан тост/экран подтверждения

Компоненты:
- `src/features/checkout/ui/CheckoutPage.tsx` — страница чекаута со степпером и формами
- `src/features/checkout/ui/CardPayment.tsx` — оплата картой через Stripe Elements

## ⚙️ Конфигурация

Переменные окружения (фронтенд и сервер):

```
# Frontend (Vite)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Backend (server.cjs)
STRIPE_SECRET_KEY=sk_test_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx   # опционально, если используются вебхуки
```

Убедитесь, что `VITE_API_URL` корректно указывает на ваш backend (`http://localhost:3000/api` в dev).

## 🧩 UI-флоу и валидации

Степы (`CheckoutPage.tsx`):
- Шаг 0 — Корзина: список позиций, сумма (`selectCartItems`, `selectTotalPrice`)
- Шаг 1 — Доставка: поля `name, phone, address, city, zipCode, notes`
  - Валидация: все поля, кроме `notes`, обязательны
- Шаг 2 — Оплата: выбор метода
  - Наложенный платёж (Cash on Delivery)
  - Карта (Stripe) — показ формы `CardPayment`
  - PayPal — placeholder кнопка
- Шаг 3 — Подтверждение: сообщение об успешном заказе и кнопка закрытия

Ошибки/состояния:
- `isCartEmpty` блокирует продолжение при пустой корзине
- `loading` во время создания заказа/оплаты
- Ошибки Stripe/валидации показываются через `Alert` и `Snackbar`

## 💳 Оплата картой (Stripe)

Форма в `CardPayment.tsx`:
- Создание PaymentIntent: `apiClient.payments.createPaymentIntent(amount, currency)` → `clientSecret`
- Подтверждение: `stripe.confirmCardPayment(clientSecret, { payment_method: { card } })`
- Успех: `onSuccess(paymentIntent.id)` — родитель вызывает `placeOrder()`

Тестовые карты:
- Успешный платёж: 4242 4242 4242 4242, любой срок/CSV
- Ошибка: используйте тест-карты Stripe из документации

Примечания:
- Валюта по умолчанию — `ils`
- В продакшене подключите 3DS/SCA при необходимости

## 📦 Создание заказа

В `CheckoutPage.tsx` функция `placeOrder()` делает:
1. Валидация адреса и суммы
2. Подготовка payload:
   ```ts
   {
     userId: entityUser?.id ?? authUser?.id ?? 0,
     items: items.map(it => ({ productId: it.product.id, quantity: it.quantity })),
     deliveryAddress,       // name, phone, address, city, zipCode, notes
     paymentMethod,         // CASH | CARD | PAYPAL
     paymentId: null | string, // для карты — ID paymentIntent
     totalAmount: total,
     currency: 'ILS'
   }
   ```
3. Вызов API: `apiClient.orders.create(payload)`
4. Очистка корзины: `dispatch(clearCart())`
5. Переход на шаг подтверждения + тост

Важно: при оплате картой `placeOrder()` вызывается после успешного `CardPayment` (через `onSuccess`).

## 🧪 API (сервер)

Платежи:
- `POST /api/payments/create-intent` — создать PaymentIntent
  - Request: `{ amount: number, currency: string }`
  - Response: `{ clientSecret: string }`

Заказы:
- `POST /api/orders` — создать заказ
  - Request: объект, описанный выше
  - Response: `{ data: Order, success: true }`

Схема `Order` (упрощённо):
```ts
type Order = {
  id: number;
  userId: number;
  items: { productId: number; quantity: number }[];
  totalAmount: number;
  paymentMethod: 'CASH' | 'CARD' | 'PAYPAL';
  paymentId?: string | null;
  createdAt: string;
};
```

## 🧯 Обработка ошибок

- Валидация адреса: показать `Alert` и удерживать текущий шаг
- Ошибки Stripe: вывод через `Alert` в `CardPayment`
- Ошибки API: стандартное сообщение из `e.response.data.message` либо fallback

## ✅ Чек-лист тестирования

1. Пустая корзина — чекаут недоступен
2. Валидный адрес → можно перейти к оплате
3. CASH: `placeOrder()` успешен, корзина очищена, шаг подтверждения и тост
4. CARD: успешная оплата (4242…), затем `placeOrder()`, очистка корзины, подтверждение
5. CARD: ошибка оплаты — сообщение об ошибке, заказ не создаётся
6. PAYPAL: кнопка отображается (пока без выполнения оплаты)
7. i18n: тексты шагов, ошибок и кнопок локализованы
8. Светлая/тёмная тема: кнопки и заголовки выглядят одинаково корректно

---

Обновлено: Август 2025

