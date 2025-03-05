import { create } from 'zustand';
import { FournisseurFormData, Fournisseur, Vendeurs } from '../types/fournisseur';

interface FournisseurStore {
  fournisseur: Fournisseur[];
  editing: Fournisseur | null;
  add: (data: FournisseurFormData) => Fournisseur;
  edit: (data: FournisseurFormData) => void;
  delete: (id: string) => void;
  setEditing: (data: Fournisseur | null) => void;
}

interface VendeurStore {
  vendeurs: Vendeurs[];
  editing: Vendeurs | null;
  add: (data: Vendeurs) => Vendeurs;
  edit: (data: Vendeurs) => void;
  delete: (id: string) => void;
  setEditing: (data: Vendeurs | null) => void;
}

export const useFournisseurStore = create<FournisseurStore>((set) => ({
  fournisseur: [],
  editing: null,
  add: (data) => {
    const new_: Fournisseur = {
      ...data,
      id: crypto.randomUUID(),
    };
    set((state) => ({ fournisseur: [...state.fournisseur, new_] }));
    return new_
  },
  edit: (data_) => {
    set((state) => {
      if (!state.editing) return state;
      return {
        fournisseur: state.fournisseur.map((data) =>
          data.id === state.editing?.id
            ? { ...data_, id: data.id }
            : data
        ),
        editing: null,
      };
    });
  },
  delete: (id) => {
    set((state) => ({
      fournisseur: state.fournisseur.filter((client) => client.id !== id),
    }));
  },
  setEditing: (client) => {
    set({ editing: client });
  },
}));

export const useVendeurStore = create<VendeurStore>(set => ({
  vendeurs: [],
  editing: null,
  add: (data) => {
    const new_: Vendeurs = {
      ...data,
      id: crypto.randomUUID(),
    };
    set((state) => ({ vendeurs: [...state.vendeurs, new_] }));
    return new_
  },
  edit: (data_) => {
    set((state) => {
      if (!state.editing) return state;
      return {
        vendeurs: state.vendeurs.map((data) =>
          data.id === state.editing?.id
            ? { ...data_, id: data.id }
            : data
        ),
        editing: null,
      };
    });
  },
  delete: (id) => {
    set((state) => ({
      vendeurs: state.vendeurs.filter((client) => client.id !== id),
    }));
  },
  setEditing: (client) => {
    set({ editing: client });
  },
}))