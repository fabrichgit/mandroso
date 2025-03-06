import React, { useState, useEffect } from 'react';
import { Plus, Save, MinusCircle, PlusCircle } from 'lucide-react';
import { useFournisseurStore } from '../../../store/useFournisseurStore';
import { useProductStore } from '../../../store/useProductStore';
import { Commande } from '../../../store/useCommandeStore';

interface Props {
    onSubmit: (cmd: Commande) => void;
    initialData?: Commande;
    isEditing?: boolean;
}

export function CommandeForm({ onSubmit, initialData, isEditing = false }: Props) {
    const { fournisseur } = useFournisseurStore();
    const products = useProductStore((state) => state.products);

    const [formData, setFormData] = useState<Commande>({
        id: Date.now().toString(),
        fournisseur: null,
        productItems: [],
        createdAt: new Date()
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                createdAt: initialData.createdAt,
                fournisseur: initialData.fournisseur || null,
                productItems: initialData.productItems || []
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        if (!isEditing) {
            setFormData({
                id: Date.now().toString(),
                fournisseur: null,
                productItems: [],
                createdAt: new Date()
            });
        }
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            productItems: [...prev.productItems, { productId: '', quantity: 1, unitPrice: 0 }]
        }));
    };;

    const handleRemoveItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            productItems: prev.productItems.filter((_, i) => i !== index)
        }));
    };

    const handleItemChange = (index: number, field: any, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            productItems: prev.productItems.map((item, i) => {
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
        return formData.productItems.reduce((total, item) => {
            return total + (item.unitPrice || 0) * item.quantity;
        }, 0);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Modifier ...' : '+ Nouveau'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="date"
                        id="createdAt"
                        name='createdAt'
                        value={(formData.createdAt as string)}
                        onChange={(e) => setFormData(prev => ({ ...prev, createdAt: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                        Fournisseur
                    </label>
                    <select
                        value={formData?.fournisseur?.id}
                        onChange={(e) => setFormData(prev => ({ ...prev, fournisseur: fournisseur?.find(f => f.id === e.currentTarget.value)! }))}
                        required
                        className="mt-1 block mb-5 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm w-max"
                    >
                        <option value="">Sélectionner un fournisseur</option>
                        {fournisseur?.map(fr => (
                            <option key={fr.id} value={fr.id}>
                                {fr.nom}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="block text-sm text-gray-700 font-bold">Produits :</h3>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Ajouter un produit
                    </button>
                </div>

                {formData.productItems.map((item, index) => (
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
                    Total: {calculateTotal().toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })}
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