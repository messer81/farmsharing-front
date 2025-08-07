// Доменные типы для заказа (order)
import type { Product } from '../../../types/api';

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'canceled';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number; // цена на момент заказа (фиксируем)
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  currency: string; // например, ILS
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  userId: number;
  items: Array<{ productId: number; quantity: number }>;
}

export interface CreateOrderResponse {
  order: Order;
  message?: string;
}


