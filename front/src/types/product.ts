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
  price?: number;
  volume: number;
  local?: string[];
  condition: 'neuf' | 'usagé' | "reconditionné" ;
  images?: string[];
  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
}

export type ProductFormData = Omit<Product, 'id'>;