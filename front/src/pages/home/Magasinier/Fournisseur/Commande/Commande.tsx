import { useCommandeStore } from "../../../../../store/useCommandeStore";
import { CommandeModal } from "../../../../../components/Founisseur/Commande/CommandeModal";
import { CommandeForm } from "../../../../../components/Founisseur/Commande/CommandeForm";

export default function CommandeDash() {

    const { commande, editing, setEditing, edit, add } = useCommandeStore()

    return (
        <div className="w-full p-4">
            <div className="space-y-8">
                <CommandeForm
                    onSubmit={add}
                    isEditing={false}
                />

                {/* <CartList
                    // setActiveTab={setActiveTab}
                    carts={carts}
                    // editCart={editCart}
                    onEdit={setEditingCart}
                    onDelete={useCartStore.getState().deleteCart}
                /> */}
            </div>

            {editing && (
                <CommandeModal
                    isOpen={!!editing}
                    onClose={() => setEditing(null)}
                    commande={editing}
                    onSubmit={edit}
                />
            )}
        </div>
    )
}
