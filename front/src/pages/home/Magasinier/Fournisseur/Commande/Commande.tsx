import { useCommandeStore } from "../../../../../store/useCommandeStore";
import { CommandeModal } from "../../../../../components/Founisseur/Commande/CommandeModal";
import { CommandeForm } from "../../../../../components/Founisseur/Commande/CommandeForm";
import { CommandeList } from "../../../../../components/Founisseur/Commande/CommandeList";

export default function CommandeDash() {

    const { commande, editing, setEditing, edit, add, delete: dt } = useCommandeStore()

    return (
        <div className="w-full p-4">
            <div className="space-y-8">
                <CommandeForm
                    onSubmit={add}
                    isEditing={false}
                />

                <CommandeList
                    // setActiveTab={setActiveTab}
                    commande={commande}
                    onEdit={setEditing}
                    onDelete={dt}
                />
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
