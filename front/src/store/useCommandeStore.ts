import { create } from "zustand";

export type Commande = {
  id?: string;
  command_date: string;
  date: string;
  products_commanded: {
    ppp_id: string;
    quantity: 0;
  }[];
  status?: "pending" | "delivered";
};

interface CommandeStore {
  commande: Commande[];
  editing: Commande | null;
  add: (data: Commande) => void;
  addMultiple?: (tables: Commande[]) => void;
  edit: (data: Commande) => void;
  setEditing: (data: Commande | null) => void;
  reset?: () => void;
  delete: (id: string) => void;
  setCommand: (data: Commande[]) => void
  // countProductInCommandes: (productId: string) => number;
}

export const useCommandeStore = create<CommandeStore>((set) => ({
  commande: [],
  setCommand(data) {
    set({commande: data})
  },
  editing: null,
  add: (data) => {
    set((state) => ({ commande: [data, ...state.commande] }));
  },
  edit: (data_) => {
    set((state) => {
      if (!state.editing) return state;
      return {
        ...state,
        editing: null,
        commande: state.commande.map((prev) =>
          prev.id === state.editing?.id ? { prev, ...data_ } : prev
        ),
      };
    });
  },
  delete: (id) => {
    set((state) => ({
      commande: state.commande.filter((cart) => cart.id !== id),
    }));
  },
  setEditing: (data) => {
    set({ editing: data });
  },
  reset() {
    set({ commande: [] });
  },
  // addMultiple(tables) {

  // },
  // countProductInCommandes: (productId) => {
  //   return get().commande.reduce((count, cmd) => {
  //     return count + cmd.table..reduce((sum, item) => item.productId === productId ? sum + item.quantity : sum, 0);
  //   }, 0);
  // },
}));
