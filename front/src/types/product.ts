export interface Product {
  id: string;
  // Informations générales
  reference: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  quantity: number;
  // Caractéristiques techniques
  dimensions: string;
  weight: number;
  color: string;
  materials: string[];
  volume: number;
  condition: 'new' | 'used' | 'refurbished';

  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
}

export type ProductFormData = Omit<Product, 'id'>;