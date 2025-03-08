import { Pencil, Trash2 } from 'lucide-react';
import { TableCommande } from '../../../store/useTableCommandeStore';
import { useProductStore } from '../../../store/useProductStore';
import TableCommandeItem from './TableCommandeItem';

interface Props {
    commande: TableCommande[];
    onEdit: (cmd: TableCommande) => void;
    onDelete: (id: string) => void;
    selectedTable: TableCommande[];
    setSelectedTable: React.Dispatch<React.SetStateAction<TableCommande[]>>
}

export function TableCommandeList({ commande, onEdit, onDelete, selectedTable, setSelectedTable }: Props) {

    if (commande.length === 0) {
        return (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">Aucune table enregistrée</p>
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
                                Fournisseur
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Produit
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Prix
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {commande?.map((cart) => (
                            <TableCommandeItem selectedTable={selectedTable}
                                setSelectedTable={setSelectedTable} cart={cart} onDelete={onDelete} onEdit={onEdit} />
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