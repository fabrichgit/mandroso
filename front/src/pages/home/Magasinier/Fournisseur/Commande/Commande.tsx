import { useCommandeStore } from "../../../../../store/useCommandeStore";
import { CommandeList } from "../../../../../components/Founisseur/Commande/CommandeList";
import { CommandeModal } from "../../../../../components/Founisseur/Commande/CommandeModal";

export default function CommandeDash() {

    const { commande, setEditing, delete: dt, edit, editing } = useCommandeStore()

    return (
        <div className="w-full p-4">
            <div className="space-y-8">
                {/* <CommandeForm
                    onSubmit={add}
                    isEditing={false}
                /> */}

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
