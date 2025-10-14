import { TShirtItem, CreateTShirtItem, OrderItem } from '@/types';
import { 
  IMaterialRepository, 
  IOrderRepository, 
  RepositoryResponse, 
  RepositoryListResponse 
} from './interfaces';
import { 
  saveToStorage, 
  loadFromStorage, 
  isStorageAvailable 
} from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { migrateInventoryData, migrateOrderData } from '@/lib/migration';

/**
 * LocalStorage implementation of MaterialRepository
 */
export class LocalStorageMaterialRepository implements IMaterialRepository {
  private readonly storageKey = 'inventory';

  async getAll(): Promise<RepositoryListResponse<TShirtItem>> {
    try {
      if (!isStorageAvailable()) {
        return { data: [], success: true };
      }

      const storedData = loadFromStorage(this.storageKey, []);
      const migratedData = migrateInventoryData(storedData);
      
      return {
        data: migratedData,
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to load materials from localStorage',
        success: false
      };
    }
  }

  async getByProductId(productId: number): Promise<RepositoryResponse<TShirtItem>> {
    try {
      const result = await this.getAll();
      if (!result.success || !result.data) {
        return { error: 'Failed to load materials', success: false };
      }

      const material = result.data.find(item => item.productId === productId);
      if (!material) {
        return { error: `Material with product ID ${productId} not found`, success: false };
      }

      return { data: material, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get material from localStorage',
        success: false
      };
    }
  }

  async create(material: CreateTShirtItem): Promise<RepositoryResponse<TShirtItem>> {
    try {
      const result = await this.getAll();
      if (!result.success || !result.data) {
        return { error: 'Failed to load existing materials', success: false };
      }

      const existingIds = result.data.map(item => item.productId);
      const newMaterial: TShirtItem = {
        ...material,
        productId: generateId(existingIds)
      };

      const updatedMaterials = [...result.data, newMaterial];
      saveToStorage(this.storageKey, updatedMaterials);

      return { data: newMaterial, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to create material in localStorage',
        success: false
      };
    }
  }

  async update(productId: number, updates: Partial<TShirtItem>): Promise<RepositoryResponse<TShirtItem>> {
    try {
      const result = await this.getAll();
      if (!result.success || !result.data) {
        return { error: 'Failed to load materials', success: false };
      }

      const materialIndex = result.data.findIndex(item => item.productId === productId);
      if (materialIndex === -1) {
        return { error: `Material with product ID ${productId} not found`, success: false };
      }

      const updatedMaterial = { ...result.data[materialIndex], ...updates };
      const updatedMaterials = [...result.data];
      updatedMaterials[materialIndex] = updatedMaterial;
      
      saveToStorage(this.storageKey, updatedMaterials);

      return { data: updatedMaterial, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to update material in localStorage',
        success: false
      };
    }
  }

  async delete(productId: number): Promise<RepositoryResponse<void>> {
    try {
      const result = await this.getAll();
      if (!result.success || !result.data) {
        return { error: 'Failed to load materials', success: false };
      }

      const updatedMaterials = result.data.filter(item => item.productId !== productId);
      saveToStorage(this.storageKey, updatedMaterials);

      return { success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to delete material from localStorage',
        success: false
      };
    }
  }

  async updateQuantity(productId: number, quantity: number): Promise<RepositoryResponse<TShirtItem>> {
    return this.update(productId, { quantity: Math.max(0, quantity) });
  }

  async addQuantity(productId: number, quantity: number): Promise<RepositoryResponse<TShirtItem>> {
    try {
      const result = await this.getByProductId(productId);
      if (!result.success || !result.data) {
        return result;
      }

      const newQuantity = result.data.quantity + quantity;
      return await this.updateQuantity(productId, newQuantity);
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to add quantity in localStorage',
        success: false
      };
    }
  }
}

/**
 * LocalStorage implementation of OrderRepository
 */
export class LocalStorageOrderRepository implements IOrderRepository {
  private readonly storageKey = 'orders';

  async getAll(): Promise<RepositoryListResponse<OrderItem>> {
    try {
      if (!isStorageAvailable()) {
        return { data: [], success: true };
      }

      const storedData = loadFromStorage(this.storageKey, []);
      console.log('Raw stored orders data:', storedData);
      const migratedData = migrateOrderData(storedData);
      console.log('Migrated orders data:', migratedData);
      
      return {
        data: migratedData,
        success: true
      };
    } catch (error) {
      console.error('Error in getAll orders:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to load orders from localStorage',
        success: false
      };
    }
  }

  async getByOrderId(orderId: number): Promise<RepositoryResponse<OrderItem>> {
    try {
      const result = await this.getAll();
      if (!result.success || !result.data) {
        return { error: 'Failed to load orders', success: false };
      }

      const order = result.data.find(item => item.orderId === orderId);
      if (!order) {
        return { error: `Order with ID ${orderId} not found`, success: false };
      }

      return { data: order, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get order from localStorage',
        success: false
      };
    }
  }

  async create(order: Omit<OrderItem, 'orderId'>): Promise<RepositoryResponse<OrderItem>> {
    try {
      console.log('LocalStorage create order called with:', order);
      const result = await this.getAll();
      console.log('Get all orders result:', result);
      
      if (!result.success || !result.data) {
        return { error: 'Failed to load existing orders', success: false };
      }

      const existingIds = result.data.map(item => item.orderId);
      console.log('Existing order IDs:', existingIds);
      
      const newOrder: OrderItem = {
        ...order,
        orderId: generateId(existingIds)
      };
      console.log('Generated new order:', newOrder);

      const updatedOrders = [...result.data, newOrder];
      console.log('Updated orders array:', updatedOrders);
      
      saveToStorage(this.storageKey, updatedOrders);
      console.log('Order saved to localStorage');

      return { data: newOrder, success: true };
    } catch (error) {
      console.error('Error in localStorage create:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to create order in localStorage',
        success: false
      };
    }
  }

  async update(orderId: number, updates: Partial<OrderItem>): Promise<RepositoryResponse<OrderItem>> {
    try {
      const result = await this.getAll();
      if (!result.success || !result.data) {
        return { error: 'Failed to load orders', success: false };
      }

      const orderIndex = result.data.findIndex(item => item.orderId === orderId);
      if (orderIndex === -1) {
        return { error: `Order with ID ${orderId} not found`, success: false };
      }

      const updatedOrder = { ...result.data[orderIndex], ...updates };
      const updatedOrders = [...result.data];
      updatedOrders[orderIndex] = updatedOrder;
      
      saveToStorage(this.storageKey, updatedOrders);

      return { data: updatedOrder, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to update order in localStorage',
        success: false
      };
    }
  }

  async delete(orderId: number): Promise<RepositoryResponse<void>> {
    try {
      const result = await this.getAll();
      if (!result.success || !result.data) {
        return { error: 'Failed to load orders', success: false };
      }

      const updatedOrders = result.data.filter(item => item.orderId !== orderId);
      saveToStorage(this.storageKey, updatedOrders);

      return { success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to delete order from localStorage',
        success: false
      };
    }
  }

  async updateStatus(orderId: number, status: OrderItem['status']): Promise<RepositoryResponse<OrderItem>> {
    return this.update(orderId, { status });
  }
}
