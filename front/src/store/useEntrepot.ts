import { create } from "zustand";

export interface Entrepot {
    id?: string;
    adress: string;
    places: string[];
    products?: {id?: string, quantity: number, places: string}[];
}

interface EntrepotStore {
    entrepot: Entrepot[];
    add: (new_: Entrepot) => void;
    remove: (id: string) => void;
    update: (id: string, new_: Entrepot) => void;
    addPlace: (id: string, place: string) => void;
    addProduct: (id: string, new_: {id: string, quantity: number, places: string}[]) => void
    countProductQuantity: (productId: string) => number;
}

export const useEntrepot = create<EntrepotStore>((set, get) => ({
    entrepot: [],
    add(new_) {
        set(prev => ({entrepot: [new_, ...prev.entrepot]}))
    },
    remove(id) {
        set(prev => ({entrepot: prev.entrepot.filter(p => p.id !== id)}))
    },
    addPlace(id, place) {
        set(prev => ({entrepot: prev.entrepot.map(p => p.id !== id ? p : {...p, places: [place, ...p.places]})}))
    },
    update(id, new_) {
        set(prev => ({entrepot: prev.entrepot.map(p => p.id !== id ? p : new_)}))
    },
    addProduct(id, new_) {
        set(prev => ({entrepot: prev.entrepot.map(p => p.id !== id ? p : {...p, products: [...new_, ...(p.products || [])]})}))
    },
    countProductQuantity(productId) {
        return get().entrepot.reduce((total, entrepot) => {
            return total + (entrepot.products?.reduce((sum, product) => 
                product.id === productId ? sum + product.quantity : sum, 0) || 0);
        }, 0);
    }
}))