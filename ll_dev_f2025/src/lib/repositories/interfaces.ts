import { TShirtItem, CreateTShirtItem, OrderItem } from '@/types';

/**
 * Common response types for repository operations
 */
export interface RepositoryResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface RepositoryListResponse<T> {
  data?: T[];
  error?: string;
  success: boolean;
}

/**
 * Material repository interface for TShirtItem operations
 */
export interface IMaterialRepository {
  getAll(): Promise<RepositoryListResponse<TShirtItem>>;
  getByProductId(productId: number): Promise<RepositoryResponse<TShirtItem>>;
  create(material: CreateTShirtItem): Promise<RepositoryResponse<TShirtItem>>;
  update(productId: number, updates: Partial<TShirtItem>): Promise<RepositoryResponse<TShirtItem>>;
  delete(productId: number): Promise<RepositoryResponse<void>>;
  updateQuantity(productId: number, quantity: number): Promise<RepositoryResponse<TShirtItem>>;
  addQuantity(productId: number, quantity: number): Promise<RepositoryResponse<TShirtItem>>;
}

/**
 * Order repository interface for OrderItem operations
 */
export interface IOrderRepository {
  getAll(): Promise<RepositoryListResponse<OrderItem>>;
  getByOrderId(orderId: number): Promise<RepositoryResponse<OrderItem>>;
  create(order: Omit<OrderItem, 'orderId'>): Promise<RepositoryResponse<OrderItem>>;
  update(orderId: number, updates: Partial<OrderItem>): Promise<RepositoryResponse<OrderItem>>;
  delete(orderId: number): Promise<RepositoryResponse<void>>;
  updateStatus(orderId: number, status: OrderItem['status']): Promise<RepositoryResponse<OrderItem>>;
}
