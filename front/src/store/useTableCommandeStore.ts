import { create } from 'zustand';
import { Fournisseur } from '../types/fournisseur';
import { Product } from '../types/product';

export type TableCommande = {
  id?: string;
  product: Product | null;
  fournisseur: Fournisseur | null;
  price?: number;
  createdAt: string | Date;
}

interface CommandeStore {
  tableCommande: TableCommande[];
  editing: TableCommande | null;
  add: (data: TableCommande) => void;
  edit: (data: TableCommande) => void;
  setEditing: (data: TableCommande | null) => void;
  reset?: () => void;
  delete: (id: string) => void;
  getById: (id: string) => TableCommande | undefined;
}

export const useTableCommandeStore = create<CommandeStore>((set, get) => ({
  tableCommande: [],
  editing: null,
  add: (data) => {
    console.log(data);
    
    set((state) => ({ tableCommande: [...state.tableCommande, data] }));
  },
  edit: (data_) => {
    set((state) => {
      if (!state.editing) return state;
      return {
        ...state, editing: null, commande: state.tableCommande.map(prev => prev.id === state.editing?.id ? { prev, ...data_ } : prev)
      };
    });
  },
  delete: (id) => {
    set((state) => ({
      tableCommande: state.tableCommande.filter((cart) => cart.id !== id),
    }));
  },
  setEditing: (data) => {
    set({ editing: data });
  },
  reset() {
    set({ tableCommande: [] })
  },
  getById(id) {
    return get().tableCommande.find(t => t.id === id)
  },
}));