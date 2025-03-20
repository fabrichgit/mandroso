import { create } from 'zustand';
import { Product } from '../types/product';
import { Facture2 } from '../hook/data';

export interface Facture {
  id: string;
  cartId: string;
  status: 'paye' | 'non paye';
}

interface FactureStore {
  factures: Facture2[];
  // add: (cartId: string) => void;
  // setStatus: (idCart: string, status: 'paye' | 'non paye') => void;
  productsFac: Partial<Product>[],
  setFatures: (data: Facture2[]) => void;
}

export const useFactureStore = create<FactureStore>((set) => ({
  factures: [],
  productsFac: [],
  setFatures(data) {
    set(prev => ({...prev, factures: data}))
  },
  // add: (cartId) => {
  //   const newFacture: Facture = { id: Date.now().toString(), cartId, status: 'non paye' };
  //   set((state) => ({ factures: [newFacture, ...state.factures] }));
  // },

  // setStatus: (idCart, status) => {
  //   set((state) => {
  //     const updatedFactures = state.factures.map((facture) =>
  //       facture.cartId !== idCart ? facture : { ...facture, status }
  //     );
  //     return { factures: updatedFactures };
  //   });
  // },
}));
