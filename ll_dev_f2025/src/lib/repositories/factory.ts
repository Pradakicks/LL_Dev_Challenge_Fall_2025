import { IMaterialRepository, IOrderRepository } from './interfaces';
import { LocalStorageMaterialRepository, LocalStorageOrderRepository } from './localStorage';
import { FirestoreMaterialRepository, FirestoreOrderRepository } from './firestore';

/**
 * Repository factory for creating repository instances
 */
export class RepositoryFactory {
  private static materialRepository: IMaterialRepository | null = null;
  private static orderRepository: IOrderRepository | null = null;

  /**
   * Get material repository instance
   */
  static getMaterialRepository(): IMaterialRepository {
    if (!this.materialRepository) {
      const useFirestore = process.env.NEXT_PUBLIC_USE_FIRESTORE === 'true';
      this.materialRepository = useFirestore 
        ? new FirestoreMaterialRepository()
        : new LocalStorageMaterialRepository();
    }
    return this.materialRepository;
  }

  /**
   * Get order repository instance
   */
  static getOrderRepository(): IOrderRepository {
    if (!this.orderRepository) {
      const useFirestore = process.env.NEXT_PUBLIC_USE_FIRESTORE === 'true';
      this.orderRepository = useFirestore 
        ? new FirestoreOrderRepository()
        : new LocalStorageOrderRepository();
    }
    return this.orderRepository;
  }

  /**
   * Clear cached repository instances
   */
  static clearCache(): void {
    this.materialRepository = null;
    this.orderRepository = null;
  }
}

/**
 * Factory function for getting repository instances
 */
export function getRepositoryFactory() {
  return {
    getMaterialRepository: () => RepositoryFactory.getMaterialRepository(),
    getOrderRepository: () => RepositoryFactory.getOrderRepository()
  };
}
