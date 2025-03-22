import { create } from 'zustand';

export type TableCommande = {
  _id?: string;
  price: number,
  product_id: string,
  provider_id: string,
}

interface CommandeStore {
  tableCommande: TableCommande[];
  setTables: (data: TableCommande[]) => void,
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
  setTables(data) {
    set({tableCommande: data})
  },
  add: (data) => {
    console.log(data);
    
    set((state) => ({ tableCommande: [...state.tableCommande, data] }));
  },
  edit: (data_) => {
    set((state) => {
      if (!state.editing) return state;
      return {
        ...state, editing: null, commande: state.tableCommande.map(prev => prev._id === state.editing?._id ? { prev, ...data_ } : prev)
      };
    });
  },
  delete: (id) => {
    set((state) => ({
      tableCommande: state.tableCommande.filter((cart) => cart._id !== id),
    }));
  },
  setEditing: (data) => {
    set({ editing: data });
  },
  reset() {
    set({ tableCommande: [] })
  },
  getById(id) {
    return get().tableCommande.find(t => t._id === id)
  },
}));