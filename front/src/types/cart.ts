
export interface CartItem {
    productId: string;
    quantity: number;
    unitPrice: number; // Prix unitaire au moment de la commande
}

export interface Cart {
    id: string;
    reference: string;
    clientId: string;
    items: CartItem[];
    status: 'pending' | 'completed' | 'cancelled';
    totalAmount: number;
    createdAt: string;
}

export type CartFormData = Omit<Cart, 'id' | 'totalAmount' | 'createdAt'>;