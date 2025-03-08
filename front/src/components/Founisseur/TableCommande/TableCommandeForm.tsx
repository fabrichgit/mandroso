import React, { useEffect, useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { useFournisseurStore } from '../../../store/useFournisseurStore';
import { useProductStore } from '../../../store/useProductStore';
import { TableCommande } from '../../../store/useTableCommandeStore';

interface Props {
    onSubmit: (cmd: TableCommande) => void;
    initialData?: TableCommande;
    isEditing?: boolean;
}

export function TableCommandeForm({ onSubmit, initialData, isEditing = false }: Props) {
    const { fournisseur } = useFournisseurStore();
    const products = useProductStore((state) => state.products);

    const [formData, setFormData] = useState<TableCommande>({
        id: Date.now().toString(),
        fournisseur: null,
        product: null,
        createdAt: new Date(),
        price: 0
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                createdAt: initialData.createdAt,
                fournisseur: initialData.fournisseur || null,
                product: initialData.product || null,
                price: initialData.price || 0
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
                product: null,
                createdAt: new Date()
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Modifier ...' : '+ Nouveau'}
            </h2>

            <div className="space-y-4">

                <div className="grid grid-cols-4 gap-4 items-end  pb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Produit
                        </label>
                        <select
                            value={formData.product?.id || ""}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                product: products?.find(f => f.id.toString() === e.target.value) || null,
                                price: products?.find(f => f.id.toString() === e.target.value)?.price
                            }))}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        >
                            <option value="">Sélectionner un produit</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
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
                            // defaultValue={formData.product?.price || 0}
                            value={formData.price || 0}
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    price: Number(e.target.value)
                                }));
                            }}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>


            <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 items-center pb-4">
                    <div>
                        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                            Fournisseur
                        </label>
                        <select
                            value={formData?.fournisseur?.id}
                            onChange={(e) => setFormData(prev => ({ ...prev, fournisseur: fournisseur?.find(f => f.id === e.target?.value)! }))}
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
                    <button
                        type="submit"
                        className="inline-flex w-max items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        {isEditing ? (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4 mr-2" />
                                Créer
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}