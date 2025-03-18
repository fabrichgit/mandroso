import { create } from 'zustand';
import { Product, ProductFormData } from '../types/product';
import useFetch from 'http-react';
import { api, token } from '../constant';

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

export const useFetchProducts = () => useFetch<Product[]>(api()+"/products/", {
  headers: {
    "Authorization": "Bearer "+token()
  }
})

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  editingProduct: null,
  setProducts(products) {
    set({products})
  },
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      _id: crypto.randomUUID(),
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  editProduct: (productData) => {
    set((state) => {
      if (!state.editingProduct) return state;
      return {
        products: state.products.map((product) =>
          product._id === state.editingProduct?._id
            ? { ...productData, id: product._id }
            : product
        ),
        editingProduct: null,
      };
    });
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },
  setEditingProduct: (product) => {
    set({ editingProduct: product });
  },
  getById(id) {
    return get().products.find(p => p._id === id)
  },
}));