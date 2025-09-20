import { CreateTShirtItem, FormErrors, ProductColor, ProductSize } from '@/types';

/**
 * Validation rules for T-shirt item creation
 */
export const TShirtItemValidation = {
  name: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  quantity: {
    min: 0,
    max: 9999,
  },
  requiredPcs: {
    min: 1,
    max: 9999,
  },
} as const;

/**
 * Validates a T-shirt item name
 */
export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Product name is required';
  }
  if (name.length < TShirtItemValidation.name.minLength) {
    return 'Product name must be at least 1 character';
  }
  if (name.length > TShirtItemValidation.name.maxLength) {
    return 'Product name must be less than 100 characters';
  }
  return null;
};

/**
 * Validates a quantity value
 */
export const validateQuantity = (quantity: number): string | null => {
  if (quantity < TShirtItemValidation.quantity.min) {
    return 'Quantity cannot be negative';
  }
  if (quantity > TShirtItemValidation.quantity.max) {
    return 'Quantity cannot exceed 9999';
  }
  return null;
};

/**
 * Validates required pieces value
 */
export const validateRequiredPcs = (requiredPcs: number): string | null => {
  if (requiredPcs < TShirtItemValidation.requiredPcs.min) {
    return 'Required pieces must be at least 1';
  }
  if (requiredPcs > TShirtItemValidation.requiredPcs.max) {
    return 'Required pieces cannot exceed 9999';
  }
  return null;
};

/**
 * Validates a product size
 */
export const validateSize = (size: string): size is ProductSize => {
  return ['S', 'M', 'L', 'XL'].includes(size);
};

/**
 * Validates a product color
 */
export const validateColor = (color: string): color is ProductColor => {
  return ['red', 'black', 'white'].includes(color);
};

/**
 * Validates a complete T-shirt item
 */
export const validateTShirtItem = (item: Partial<CreateTShirtItem>): FormErrors => {
  const errors: FormErrors = {};

  if (item.name !== undefined) {
    const nameError = validateName(item.name);
    if (nameError) errors.name = nameError;
  }

  if (item.quantity !== undefined) {
    const quantityError = validateQuantity(item.quantity);
    if (quantityError) errors.quantity = quantityError;
  }

  if (item.requiredPcs !== undefined) {
    const requiredPcsError = validateRequiredPcs(item.requiredPcs);
    if (requiredPcsError) errors.requiredPcs = requiredPcsError;
  }

  if (item.size !== undefined && !validateSize(item.size)) {
    errors.size = 'Invalid size selected';
  }

  if (item.color !== undefined && !validateColor(item.color)) {
    errors.color = 'Invalid color selected';
  }

  return errors;
};

/**
 * Checks if a form has any validation errors
 */
export const hasValidationErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
