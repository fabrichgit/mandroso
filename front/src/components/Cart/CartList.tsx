import { FilePlus, FileText, Pencil, Trash2 } from 'lucide-react';
import { Cart, CartFormData } from '../../types/cart';
import { useClientStore } from '../../store/useClientStore';
import { useProductStore } from '../../store/useProductStore';
import { useState } from 'react';
import { Invoice } from './Invoice';
import { useDeliveryStore } from '../../store/useDeliveryStore';
import toast from 'react-hot-toast';
import { useFactureStore } from '../../store/useFactureStore';

interface CartListProps {
    carts: Cart[],
    onEdit: (cart: Cart) => void;
    onDelete: (id: string) => void;
    editCart: (cartData: CartFormData) => void
    setActiveTab: React.Dispatch<React.SetStateAction<any>>
}

export function CartList({ onEdit, onDelete, editCart, carts, setActiveTab }: CartListProps) {
    const clients = useClientStore((state) => state.clients);
    const products = useProductStore((state) => state.products);
    const [selectedCart, setSelectedCart] = useState<{ cart: Cart, action: 'invoice' | 'deliveryNote' } | null>(null);

    const { add, delivery: delv } = useDeliveryStore()
    const { add: addFac, factures } = useFactureStore()

    const getClientName = (clientId: string) => {
        return clients.find(c => c.id === clientId)?.name || 'Client inconnu';
    };

    const getStatusBadgeClass = (status: Cart['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: Cart['status']) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'completed':
                return 'Terminée';
            case 'cancelled':
                return 'Annulée';
            default:
                return status;
        }
    };

    const delivery = (cart: Cart) => {
        add(cart.id)
        editCart({ ...cart, isDelivery: true })
        toast.success('ok !');
        setActiveTab('delivery')
    }

    const facture = (cart: Cart) => {
        addFac(cart.id)
        editCart({ ...cart, isFacture: true })
        toast.success('ok !');
        setActiveTab('facture')
    }

    if (carts.length === 0) {
        return (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">Aucune panier enregistrée</p>
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
                                Référence
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Produits
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {carts?.map((cart) => (
                            <tr key={cart.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {cart.reference}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {getClientName(cart.clientId)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <ul className="list-disc list-inside">
                                        {cart.items.map((item, index) => {
                                            const product = products.find(p => p.id === item.productId);
                                            return product ? (
                                                <li key={index}>
                                                    {product.name} (x{item.quantity}) - {item.unitPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })} /unité
                                                </li>
                                            ) : null;
                                        })}
                                    </ul>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {cart.totalAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(cart.status)}`}>
                                        {getStatusText(cart.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(cart.createdAt).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {delv.find(del => del.cartId === cart.id) ? null : <button
                                        onClick={() => delivery(cart)}
                                        className="text-orange-600 hover:text-green-900 mr-4"
                                        title="bon de livraison"
                                    >
                                        <FilePlus className="h-4 w-4" />
                                    </button> }
                                    {factures.find(del => del.cartId === cart.id) ? null : <button
                                        onClick={() => facture(cart)}
                                        className="text-green-600 hover:text-green-900 mr-4"
                                        title="creer la facture"
                                    >
                                        <FileText className="h-4 w-4" />
                                    </button> }
                                    {/* <button
                                        onClick={() => setSelectedCart({ cart, action: 'invoice' })}
                                        className="text-green-600 hover:text-green-900 mr-4"
                                        title="creer la facture"
                                    >
                                        <FileText className="h-4 w-4" />
                                    </button> */}
                                    <button
                                        onClick={() => onEdit(cart)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                        title="Modifier"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(cart.id)}
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
                {selectedCart && selectedCart.action === 'invoice' ? (
                    <Invoice cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
                ) : null}
                {/* {selectedCart && selectedCart.action === 'deliveryNote' ? (
                    <DeliveryNote cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
                ) : null} */}
            </div>
        </>
    );
}