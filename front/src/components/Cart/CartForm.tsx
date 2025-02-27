import React, { useState, useEffect } from 'react';
import { Plus, Save, MinusCircle, PlusCircle } from 'lucide-react';
import { useClientStore } from '../../store/useClientStore';
import { useProductStore } from '../../store/useProductStore';
import { Cart, CartFormData } from '../../types/cart';

interface CartFormProps {
    onSubmit: (cart: CartFormData) => void;
    initialData?: Cart;
    isEditing?: boolean;
}

export function CartForm({ onSubmit, initialData, isEditing = false }: CartFormProps) {
    const clients = useClientStore((state) => state.clients);
    const products = useProductStore((state) => state.products);

    const [formData, setFormData] = useState<CartFormData>({
        reference: '',
        clientId: '',
        items: [],
        status: 'pending',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                reference: initialData.reference,
                clientId: initialData.clientId,
                items: initialData.items,
                status: initialData.status,
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        if (!isEditing) {
            setFormData({
                reference: '',
                clientId: '',
                items: [],
                status: 'pending',
            });
        }
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { productId: '', quantity: 1, unitPrice: 0 }]
        }));
    };

    const handleRemoveItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const handleItemChange = (index: number, field: any, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map((item, i) => {
                if (i === index) {
                    if (field === 'productId') {
                        return {
                            ...item,
                            [field]: value,
                            unitPrice: products.find(p => p.id === value)?.price || 0
                        };
                    }
                    return { ...item, [field]: value };
                }
                return item;
            })
        }));
    };


    const calculateTotal = () => {
        return formData.items.reduce((total, item) => {
            return total + (item.unitPrice || 0) * item.quantity;
        }, 0);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Modifier ...' : '+ Nouveau'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                        Référence
                    </label>
                    <input
                        type="text"
                        id="reference"
                        value={formData.reference}
                        onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
                        Client
                    </label>
                    <select
                        id="clientId"
                        value={formData.clientId}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientId: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    >
                        <option value="">Sélectionner un client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Statut
                    </label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Cart['status'] }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    >
                        <option value="pending">En attente</option>
                        <option value="completed">Terminée</option>
                        <option value="cancelled">Annulée</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Produits</h3>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Ajouter un produit
                    </button>
                </div>

                {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-end border-b border-gray-200 pb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Produit
                            </label>
                            <select
                                value={item.productId}
                                onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                            >
                                <option value="">Sélectionner un produit</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} {product.price ? ` - ${product.price} ar` : null}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Prix unitaire
                            </label>
                            <input
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                                required
                                min="0"
                                step="0.01"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Quantité
                            </label>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                required
                                min="1"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="text-red-600 hover:text-red-900"
                            >
                                <MinusCircle className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center pt-4">
                <div className="text-lg font-semibold">
                    Total: {calculateTotal().toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    {isEditing ? (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Sauvegarder
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4 mr-2" />
                            Créer la panier
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}