import { create } from 'zustand';

export interface Facture {
  id: string;
  cartId: string;
  status: 'paye' | 'non paye';
}

interface FactureStore {
  factures: Facture[];
  add: (cartId: string) => void;
  setStatus: (idCart: string, status: 'paye' | 'non paye') => void;
}

export const useFactureStore = create<FactureStore>((set) => ({
  factures: [],

  add: (cartId) => {
    const newFacture: Facture = { id: Date.now().toString(), cartId, status: 'non paye' };
    set((state) => ({ factures: [newFacture, ...state.factures] }));
  },

  setStatus: (idCart, status) => {
    set((state) => {
      const updatedFactures = state.factures.map((facture) =>
        facture.cartId !== idCart ? facture : { ...facture, status }
      );
      return { factures: updatedFactures };
    });
  },
}));
