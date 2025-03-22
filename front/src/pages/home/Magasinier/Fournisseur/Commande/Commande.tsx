import { useCommandeStore } from "../../../../../store/useCommandeStore";
import { CommandeList } from "../../../../../components/Founisseur/Commande/CommandeList";
import { CommandeModal } from "../../../../../components/Founisseur/Commande/CommandeModal";
import { useCommands } from "../../../../../hook/data";
import { useEffect } from "react";

export default function CommandeDash() {
    const {data} = useCommands()
    const { commande, setEditing, delete: dt, edit, editing, setCommand } = useCommandeStore()

    useEffect(() => {
        setCommand(data)
    }, [data])

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
