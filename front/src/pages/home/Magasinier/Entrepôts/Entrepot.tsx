import { Plus } from "lucide-react";
import { useState } from "react";
import { EntrepotForm } from "../../../../components/Entrepot/EntrepotForm";
import { EntrepotList } from "../../../../components/Entrepot/EntrepotList";

function EntrepotDash() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="min-h-screen w-full bg-gray-100 p-6">
            <div className="w-full mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Entrepôts</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Nouvel Entrepôt
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <EntrepotForm onClose={() => setShowForm(false)} />
                    </div>
                )}

                <EntrepotList />
            </div>
        </div>
    );

}

export default EntrepotDash


// export function EntreForm() {

//     const [formData, setFormData] = useState<FournisseurFormData>({
//         nom: '',
//         telephone: '',
//         nif: '',
//         stat: '',
//         adresse: '',
//         compte: '',
//         credit: '',
//         livraison: '',
//         vendeurs: []
//     });

//     return (
//         <></>
//     )
// }