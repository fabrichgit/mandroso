import { useState } from "react";
import { TableCommandeForm } from "../../../../../components/Founisseur/TableCommande/TableCommandeForm"
import { TableCommandeList } from "../../../../../components/Founisseur/TableCommande/TableCommandeList"
import { TableCommandeModal } from "../../../../../components/Founisseur/TableCommande/TableCommandeModal"
import { type TableCommande, useTableCommandeStore } from "../../../../../store/useTableCommandeStore"

function TableCommande() {
    const { tableCommande, editing, setEditing, edit, add, delete: dt } = useTableCommandeStore();
    // const _ = useCommandeStore.getState().addMultiple

    const [selectedTable, setSelectedTable] = useState<TableCommande[]>([])

    // const commander = () => {
    //     const c: Commande[] = Object.values(
    //         selectedTable.reduce((acc, tableCommande) => {
    //             if (!tableCommande.fournisseur || !tableCommande.product) return acc;

    //             const fournisseurId = tableCommande.fournisseur.id!;

    //             if (!acc[fournisseurId]) {
    //                 acc[fournisseurId] = {
    //                     id: tableCommande.id,
    //                     fournisseur: tableCommande.fournisseur,
    //                     product: [],
    //                     createdAt: tableCommande.createdAt.toString(),
    //                     status: "pending",
    //                 };
    //             }

    //             acc[fournisseurId].product?.push({
    //                 nom: tableCommande.product.name,
    //                 price: tableCommande.price ?? tableCommande.product.price ?? 0,
    //                 quantity: tableCommande.product.quantity,
    //             });

    //             return acc;
    //         }, {} as Record<string, Commande>)
    //     );

    //     console.log(c);
        

    // }

    return (
        <div className="w-full p-4">
            <div className="space-y-8">
                <TableCommandeForm
                    onSubmit={add}
                    isEditing={false}
                />

                <TableCommandeList
                    commande={tableCommande}
                    onEdit={setEditing}
                    onDelete={dt}
                    selectedTable={selectedTable}
                    setSelectedTable={setSelectedTable}
                />
            </div>
            {editing && (
                <TableCommandeModal
                    isOpen={!!editing}
                    onClose={() => setEditing(null)}
                    commande={editing}
                    onSubmit={edit}
                />
            )}
        </div>
    )
}

export default TableCommande
