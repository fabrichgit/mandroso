import { create } from 'zustand';
import { FournisseurFormData, Fournisseur, Vendeurs } from '../types/fournisseur';

interface FournisseurStore {
  fournisseur: Fournisseur[];
  setFournisseur: (data: Fournisseur[]) => void;
  editing: Fournisseur | null;
  add: (data: FournisseurFormData) => Fournisseur;
  edit: (data: FournisseurFormData) => void;
  delete: (id: string) => void;
  setEditing: (data: Fournisseur | null) => void;
  getById: (id: string) => Fournisseur | undefined
}

interface VendeurStore {
  vendeurs: Vendeurs[];
  editing: Vendeurs | null;
  setVendeurs: (data: Vendeurs[]) => void
  add: (data: Vendeurs) => Vendeurs;
  edit: (data: Vendeurs) => void;
  delete: (id: string) => void;
  setEditing: (data: Vendeurs | null) => void;
}

export const useFournisseurStore = create<FournisseurStore>((set, get) => ({
  fournisseur: [],
  editing: null,
  setFournisseur(data) {
    set({fournisseur: data})
  },
  add: (data) => {
    const new_: Fournisseur = {
      ...data,
      _id: crypto.randomUUID(),
    };
    set((state) => ({ fournisseur: [...state.fournisseur, new_] }));
    return new_
  },
  edit: (data_) => {
    set((state) => {
      if (!state.editing) return state;
      return {
        fournisseur: state.fournisseur.map((data) =>
          data._id === state.editing?._id
            ? { ...data_, _id: data._id }
            : data
        ),
        editing: null,
      };
    });
  },
  delete: (id) => {
    set((state) => ({
      fournisseur: state.fournisseur.filter((client) => client._id !== id),
    }));
  },
  setEditing: (client) => {
    set({ editing: client });
  },
  getById(id) {
    return get().fournisseur?.find(p => p.name === id)
  },
}));

export const useVendeurStore = create<VendeurStore>(set => ({
  vendeurs: [],
  editing: null,
  setVendeurs(data) {
    set({vendeurs: data})
  },
  add: (data) => {
    const new_: Vendeurs = {
      ...data,
      _id: crypto.randomUUID(),
    };
    set((state) => ({ vendeurs: [...state.vendeurs, new_] }));
    return new_
  },
  edit: (data_) => {
    set((state) => {
      if (!state.editing) return state;
      return {
        vendeurs: state.vendeurs.map((data) =>
          data._id === state.editing?._id
            ? { ...data_, _id: data._id }
            : data
        ),
        editing: null,
      };
    });
  },
  delete: (id) => {
    set((state) => ({
      vendeurs: state.vendeurs.filter((client) => client._id !== id),
    }));
  },
  setEditing: (client) => {
    set({ editing: client });
  },
}))