// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Типы для элементов корзины
interface CartItem {
    id: number
    title: string
    price: number
    imageUrl?: string
    quantity: number
}
interface CartState {
    items: CartItem[]
    totalAmount: number
    totalQuantity: number
}
const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    totalAmount: 0,
    totalQuantity: 0,
}
const calculateTotals = (items: CartItem[]) => ({
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>
        ) => {
            const { id, quantity = 1, ...itemData } = action.payload
            const existingItem = state.items.find(item => item.id === id)
            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                state.items.push({ id, quantity, ...itemData })
            }
            const totals = calculateTotals(state.items)
            state.totalAmount = totals.totalAmount
            state.totalQuantity = totals.totalQuantity
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            const totals = calculateTotals(state.items)
            state.totalAmount = totals.totalAmount
            state.totalQuantity = totals.totalQuantity
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload
            const item = state.items.find(item => item.id === id)
            if (item) {
                if (quantity <= 0) state.items = state.items.filter(item => item.id !== id)
                else item.quantity = quantity
                const totals = calculateTotals(state.items)
                state.totalAmount = totals.totalAmount
                state.totalQuantity = totals.totalQuantity
                localStorage.setItem('cartItems', JSON.stringify(state.items))
            }
        },
        clearCart: (state) => {
            state.items = []
            state.totalAmount = 0
            state.totalQuantity = 0
            localStorage.removeItem('cartItems')
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//
// // Типы для элементов корзины
// interface CartItem {
//     id: number
//     title: string
//     price: number
//     imageUrl?: string
//     quantity: number
// }
//
// interface CartState {
//     items: CartItem[]
//     totalAmount: number
//     totalQuantity: number
// }
//
// const initialState: CartState = {
//     items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
//     totalAmount: 0,
//     totalQuantity: 0,
// }
//
// // Функция для подсчёта общей суммы и количества
// const calculateTotals = (items: CartItem[]) => {
//     const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
//     const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
//     return { totalQuantity, totalAmount }
// }
//
// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         // Добавление товара в корзину
//         addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
//             const { id, quantity = 1, ...itemData } = action.payload
//             const existingItem = state.items.find(item => item.id === id)
//
//             if (existingItem) {
//                 // Если товар уже есть в корзине - увеличиваем количество
//                 existingItem.quantity += quantity
//             } else {
//                 // Если товара нет - добавляем новый элемент
//                 state.items.push({ id, quantity, ...itemData })
//             }
//
//             // Пересчитываем общие суммы
//             const totals = calculateTotals(state.items)
//             state.totalAmount = totals.totalAmount
//             state.totalQuantity = totals.totalQuantity
//
//             // Сохраняем в localStorage
//             localStorage.setItem('cartItems', JSON.stringify(state.items))
//         },
//
//         // Удаление товара из корзины
//         removeFromCart: (state, action: PayloadAction<number>) => {
//             const id = action.payload
//             state.items = state.items.filter(item => item.id !== id)
//
//             // Пересчитываем общие суммы
//             const totals = calculateTotals(state.items)
//             state.totalAmount = totals.totalAmount
//             state.totalQuantity = totals.totalQuantity
//
//             // Сохраняем в localStorage
//             localStorage.setItem('cartItems', JSON.stringify(state.items))
//         },
//
//         // Изменение количества товара
//         updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
//             const { id, quantity } = action.payload
//             const item = state.items.find(item => item.id === id)
//
//             if (item) {
//                 if (quantity <= 0) {
//                     // Если количество 0 или меньше - удаляем товар
//                     state.items = state.items.filter(item => item.id !== id)
//                 } else {
//                     // Иначе обновляем количество
//                     item.quantity = quantity
//                 }
//
//                 // Пересчитываем общие суммы
//                 const totals = calculateTotals(state.items)
//                 state.totalAmount = totals.totalAmount
//                 state.totalQuantity = totals.totalQuantity
//
//                 // Сохраняем в localStorage
//                 localStorage.setItem('cartItems', JSON.stringify(state.items))
//             }
//         },
//
//         // Очистка корзины
//         clearCart: (state) => {
//             state.items = []
//             state.totalAmount = 0
//             state.totalQuantity = 0
//             localStorage.removeItem('cartItems')
//         },
//     },
// })
//
// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
// export default cartSlice.reducer
