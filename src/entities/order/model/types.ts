// Доменные типы для заказа (order)
import type { Product } from '../../../types/api';

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'canceled';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  PAYPAL = 'paypal',
}

export interface DeliveryAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  notes?: string;
}

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
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  userId: number;
  items: Array<{ productId: number; quantity: number }>;
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  paymentId?: string | null;
  totalAmount: number;
  currency: string;
}

export interface CreateOrderResponse {
  order: Order;
  message?: string;
}


