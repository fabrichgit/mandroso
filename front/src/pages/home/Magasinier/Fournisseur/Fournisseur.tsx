import { UserSquare2Icon } from "lucide-react";
import { useFournisseurStore, useVendeurStore } from "../../../../store/useFournisseurStore";
import { FournisseurModal } from "../../../../components/Founisseur/FournisseurModal";
import { FournisseurForm } from "../../../../components/Founisseur/FournisseurForm";
import { FounisseurList } from "../../../../components/Founisseur/FounisseurList";
import { useState } from "react";
import { VendeurList } from "../../../../components/Founisseur/VendeurList";
import VendeurDropdown from "../../../../components/Founisseur/VendeurDropdown";
import CommandeDash from "./Commande/Commande";

function Fournisseur() {

    const [activeTab, setActiveTab] = useState<'fournisseur' | 'vendeur' | 'commande'>('fournisseur');
    const { fournisseur, editing, setEditing } = useFournisseurStore();

    const { vendeurs, add, setEditing: setEditingVnd, delete: d } = useVendeurStore()

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="flex justify-between items-center w-full border-b border-gray-200 px-4">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('commande')}
                        className={`${activeTab === 'commande'
                            ? 'border-b-2 border-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Commande
                    </button>
                    <button
                        onClick={() => setActiveTab('fournisseur')}
                        className={`${activeTab === 'fournisseur'
                            ? 'border-b-2 border-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Fournisseur
                    </button>
                    <button
                        onClick={() => setActiveTab('vendeur')}
                        className={`${activeTab === 'vendeur'
                            ? 'border-b-2 border-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Vendeur
                    </button>
                </nav>
            </div>

            {(() => {
                switch (activeTab) {
                    case 'fournisseur':
                        return (
                            <>
                                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                                    <div className="px-4 py-6 sm:px-0">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center font-bold text-lg">
                                                <UserSquare2Icon className="h-50 w-5 text-blue-600 mr-3" />
                                                fournisseur
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Total: {fournisseur.length}
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <FournisseurForm
                                                onSubmit={useFournisseurStore.getState().add}
                                                isEditing={false}
                                            />

                                            <FounisseurList
                                                fournisseur={fournisseur}
                                                onEdit={setEditing}
                                                onDelete={useFournisseurStore.getState().delete}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {editing && (
                                    <FournisseurModal
                                        isOpen={!!editing}
                                        onClose={() => setEditing(null)}
                                        client={editing}
                                        onSubmit={useFournisseurStore.getState().edit}
                                    />
                                )}
                            </>
                        )
                    case 'vendeur':
                        return (
                            <>
                                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                                    <div className="px-4 py-6 sm:px-0">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center font-bold text-lg">
                                                <UserSquare2Icon className="h-50 w-5 text-blue-600 mr-3" />
                                                vendeur
                                            </div>
                                            <div className="flex justify-end items-center gap-3 w-max">
                                                <label htmlFor="">Ajouter un vendeur</label>
                                                <VendeurDropdown onSubmit={add} />
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <VendeurList
                                                vendeur={vendeurs}
                                                onEdit={setEditingVnd}
                                                onDelete={d}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {editing && (
                                    <FournisseurModal
                                        isOpen={!!editing}
                                        onClose={() => setEditing(null)}
                                        client={editing}
                                        onSubmit={useFournisseurStore.getState().edit}
                                    />
                                )}
                            </>
                        )
                    case 'commande':
                        return <CommandeDash/>
                    default:
                        break;
                }
            })()}
        </div>
    );
}

export default Fournisseur
