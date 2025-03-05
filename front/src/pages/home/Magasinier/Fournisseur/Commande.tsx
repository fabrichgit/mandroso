import { MinusCircle, PlusCircle } from "lucide-react"
import { Commande } from "../../../../store/useCommandeStore";
import { useState } from "react";
import { useProductStore } from "../../../../store/useProductStore";
import { useFournisseurStore } from "../../../../store/useFournisseurStore";

export default function CommandeDash() {

    const products = useProductStore((state) => state.products);
    const { fournisseur } = useFournisseurStore();

    const [formData, setFormData] = useState<Commande>({
        fournisseur: null,
        productItems: []
    });

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            productItems: [...prev.productItems, { productId: '', quantity: 1, unitPrice: 0 }]
        }));
    };

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

    return (
        <div className="w-full p-4">
            <select
                value={formData.fournisseur?.id}
                onChange={(e) => setFormData(prev => ({...prev, fournisseur: fournisseur.find(f => f.id === e.currentTarget.id)!}))}
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
        </div>
    )
}
