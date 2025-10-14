import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TShirtItem, OrderItem, CreateTShirtItem } from '@/types';
import { 
  IMaterialRepository, 
  IOrderRepository, 
  RepositoryResponse, 
  RepositoryListResponse 
} from './interfaces';

/**
 * Firestore implementation of MaterialRepository
 */
export class FirestoreMaterialRepository implements IMaterialRepository {
  private readonly collectionName = 'materials';

  async getAll(): Promise<RepositoryListResponse<TShirtItem>> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const materials: TShirtItem[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        materials.push({
          productId: data.productId,
          name: data.name,
          size: data.size,
          color: data.color,
          quantity: data.quantity,
          requiredPcs: data.requiredPcs
        });
      });

      return {
        data: materials,
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get materials from Firestore',
        success: false
      };
    }
  }

  async getByProductId(productId: number): Promise<RepositoryResponse<TShirtItem>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('productId', '==', productId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return {
          error: `Material with product ID ${productId} not found`,
          success: false
        };
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const material: TShirtItem = {
        productId: data.productId,
        name: data.name,
        size: data.size,
        color: data.color,
        quantity: data.quantity,
        requiredPcs: data.requiredPcs
      };

      return {
        data: material,
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get material from Firestore',
        success: false
      };
    }
  }

  async create(material: CreateTShirtItem): Promise<RepositoryResponse<TShirtItem>> {
    try {
      // Generate a unique productId
      const productId = Date.now() + Math.floor(Math.random() * 1000);
      
      const newMaterial: TShirtItem = {
        ...material,
        productId
      };

      // Store the productId as a field in the document
      const docData = {
        productId: productId,
        name: newMaterial.name,
        size: newMaterial.size,
        color: newMaterial.color,
        quantity: newMaterial.quantity,
        requiredPcs: newMaterial.requiredPcs,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, this.collectionName), docData);

      return {
        data: newMaterial,
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to create material in Firestore',
        success: false
      };
    }
  }

  async update(productId: number, updates: Partial<TShirtItem>): Promise<RepositoryResponse<TShirtItem>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('productId', '==', productId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return {
          error: `Material with product ID ${productId} not found`,
          success: false
        };
      }

      const docRef = querySnapshot.docs[0].ref;
      const updateData: any = { ...updates };
      delete updateData.productId; // Don't update the productId
      
      await updateDoc(docRef, updateData);

      const result = await this.getByProductId(productId);
      return result;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to update material in Firestore',
        success: false
      };
    }
  }

  async delete(productId: number): Promise<RepositoryResponse<void>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('productId', '==', productId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return {
          error: `Material with product ID ${productId} not found`,
          success: false
        };
      }

      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);

      return {
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to delete material from Firestore',
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
        error: error instanceof Error ? error.message : 'Failed to add quantity in Firestore',
        success: false
      };
    }
  }
}

/**
 * Firestore implementation of OrderRepository
 */
export class FirestoreOrderRepository implements IOrderRepository {
  private readonly collectionName = 'orders';

  async getAll(): Promise<RepositoryListResponse<OrderItem>> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const orders: OrderItem[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          orderId: data.orderId,
          productId: data.productId,
          quantity: data.quantity,
          status: data.status,
          orderDate: data.orderDate
        });
      });

      return {
        data: orders,
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get orders from Firestore',
        success: false
      };
    }
  }

  async getByOrderId(orderId: number): Promise<RepositoryResponse<OrderItem>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('orderId', '==', orderId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return {
          error: `Order with ID ${orderId} not found`,
          success: false
        };
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const order: OrderItem = {
        orderId: data.orderId,
        productId: data.productId,
        quantity: data.quantity,
        status: data.status,
        orderDate: data.orderDate
      };

      return {
        data: order,
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get order from Firestore',
        success: false
      };
    }
  }

  async create(order: Omit<OrderItem, 'orderId'>): Promise<RepositoryResponse<OrderItem>> {
    try {
      // Generate a unique orderId
      const orderId = Date.now() + Math.floor(Math.random() * 1000);
      
      const newOrder: OrderItem = {
        ...order,
        orderId
      };

      // Store the orderId as a field in the document
      const docData = {
        orderId: orderId,
        productId: newOrder.productId,
        quantity: newOrder.quantity,
        status: newOrder.status,
        orderDate: newOrder.orderDate,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, this.collectionName), docData);

      return {
        data: newOrder,
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to create order in Firestore',
        success: false
      };
    }
  }

  async update(orderId: number, updates: Partial<OrderItem>): Promise<RepositoryResponse<OrderItem>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('orderId', '==', orderId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return {
          error: `Order with ID ${orderId} not found`,
          success: false
        };
      }

      const docRef = querySnapshot.docs[0].ref;
      const updateData: any = { ...updates };
      delete updateData.orderId; // Don't update the orderId
      
      await updateDoc(docRef, updateData);

      const result = await this.getByOrderId(orderId);
      return result;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to update order in Firestore',
        success: false
      };
    }
  }

  async delete(orderId: number): Promise<RepositoryResponse<void>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('orderId', '==', orderId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return {
          error: `Order with ID ${orderId} not found`,
          success: false
        };
      }

      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);

      return {
        success: true
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to delete order from Firestore',
        success: false
      };
    }
  }

  async updateStatus(orderId: number, status: OrderItem['status']): Promise<RepositoryResponse<OrderItem>> {
    return this.update(orderId, { status });
  }
}