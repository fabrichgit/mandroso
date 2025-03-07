import { create } from 'zustand';
import { Product, ProductFormData } from '../types/product';

interface ProductStore {
  products: Product[];
  editingProduct: Product | null;
  addProduct: (productData: ProductFormData) => void;
  editProduct: (productData: ProductFormData) => void;
  deleteProduct: (id: string) => void;
  setEditingProduct: (product: Product | null) => void;
  setProducts: (products: Product[]) => void
  getById: (id: string) => Product | undefined
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  editingProduct: null,
  setProducts(products) {
    set({products})
  },
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  editProduct: (productData) => {
    set((state) => {
      if (!state.editingProduct) return state;
      return {
        products: state.products.map((product) =>
          product.id === state.editingProduct?.id
            ? { ...productData, id: product.id }
            : product
        ),
        editingProduct: null,
      };
    });
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },
  setEditingProduct: (product) => {
    set({ editingProduct: product });
  },
  getById(id) {
    return get().products.find(p => p.id === id)
  },
}));