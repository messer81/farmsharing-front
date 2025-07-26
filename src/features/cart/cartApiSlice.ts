// src/features/cart/cartApiSlice.ts
import { apiSlice } from '../../api/apiSlice'

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartItem[], void>({
            query: () => '/cart',
        }),
        addItem: builder.mutation<CartItem, { productId: number; quantity: number }>({
            query: (data) => ({
                url: '/cart',
                method: 'POST',
                body: data,
            }),
        }),
        removeItem: builder.mutation<void, number>({
            query: (itemId) => ({
                url: `/cart/${itemId}`,
                method: 'DELETE',
            }),
        }),
        updateQuantity: builder.mutation<CartItem, { itemId: number; quantity: number }>({
            query: ({ itemId, quantity }) => ({
                url: `/cart/${itemId}`,
                method: 'PATCH',
                body: { quantity },
            }),
        }),
        clearCart: builder.mutation<void, void>({
            query: () => ({
                url: '/cart/clear',
                method: 'POST',
            }),
        }),
    }),
})

export const {
    useGetCartQuery,
    useAddItemMutation,
    useRemoveItemMutation,
    useUpdateQuantityMutation,
    useClearCartMutation,
} = cartApiSlice
