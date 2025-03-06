import { Pencil, Trash2 } from 'lucide-react';
import { Commande } from '../../../store/useCommandeStore';
import { useProductStore } from '../../../store/useProductStore';

interface Props {
    commande: Commande[];
    onEdit: (cmd: Commande) => void;
    onDelete: (id: string) => void;
}

export function CommandeList({ commande, onEdit, onDelete }: Props) {
    const products = useProductStore((state) => state.products);

    if (commande.length === 0) {
        return (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">Aucune commande enregistrée</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fournisseur
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Produits
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {commande?.map((cart) => (
                            <tr key={cart.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {cart.createdAt as string}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {cart.fournisseur?.nom}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <ul className="list-disc list-inside">
                                        {cart.productItems.map((item, index) => {
                                            const product = products.find(p => p.id === item.productId);
                                            return product ? (
                                                <li key={index}>
                                                    {product.name} (x{item.quantity}) - {item.unitPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })} /unité
                                                </li>
                                            ) : null;
                                        })}
                                    </ul>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(cart)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                        title="Modifier"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(cart.id!)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* {selectedCart && selectedCart.action === 'invoice' ? (
                    <Invoice cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
                ) : null}
                {selectedCart && selectedCart.action === 'deliveryNote' ? (
                    <DeliveryNote cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
                ) : null} */}
            </div>
        </>
    );
}