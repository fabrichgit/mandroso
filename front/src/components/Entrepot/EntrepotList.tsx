import { useState } from 'react';
import { useEntrepot } from '../../store/useEntrepot';
import { Pencil, Trash2, Warehouse, PlusCircle, Eye, Maximize } from 'lucide-react';
import { EntrepotForm } from './EntrepotForm';
import { useProductStore } from '../../store/useProductStore';
import { AiFillCloseCircle } from 'react-icons/ai';
import resize from '../../utils/maximise';

export function EntrepotList() {

    const { products: availableProducts } = useProductStore()
    const { entrepot, remove, addProduct } = useEntrepot();
    const [editingEntrepot, setEditingEntrepot] = useState<string | null>(null);
    const [selectedEntrepot, setSelectedEntrepot] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<{ id: string; name: string; quantity: number; place: string }[]>([]);

    const [selectedEntrepotDetails, setSelectedEntrepotDetails] = useState<any | null>(null);

    // Ouvrir le modal de détails
    // const openDetails = (entrepot: any) => {
    //     setSelectedEntrepotDetails(entrepot);
    // };

    // Ouvrir le modal et stocker l'entrepôt sélectionné
    const openModal = (entrepotId: string) => {
        setSelectedEntrepot(entrepotId);
        setSelectedProducts([]);
        setModalOpen(true);
    };

    // Sélectionner/Désélectionner un produit
    const toggleProductSelection = (product: { id: string; name: string }) => {
        setSelectedProducts((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.filter((p) => p.id !== product.id);
            } else {
                return [...prev, { ...product, quantity: 1, place: '' }];
            }
        });
    };

    // Modifier la quantité du produit sélectionné
    const updateQuantity = (id: string, quantity: number) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, quantity } : p))
        );
    };

    // Modifier la place du produit sélectionné
    const updatePlace = (id: string, place: string) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, place } : p))
        );
    };

    // Ajouter les produits avec leur place dans l'entrepôt
    const confirmSelection = () => {
        if (selectedEntrepot) {
            addProduct(selectedEntrepot, selectedProducts.map(p => ({ id: p.id, quantity: p.quantity, places: p.place })));
            setModalOpen(false);
        }
    };

    return (
        <>
            <div className="space-y-4 p-4">
                {entrepot.map((e) => (
                    <div key={e.id} className="bg-white rounded-lg shadow-md p-6">
                        {editingEntrepot === e.id ? (
                            <EntrepotForm entrepot={e} onClose={() => setEditingEntrepot(null)} />
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Warehouse className="text-orange-600" />
                                        <h3 className="text-lg font-semibold">{e.adress}</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingEntrepot(e.id!)}
                                            className="p-2 text-gray-600 hover:text-orange-600 rounded-full hover:bg-gray-100"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => e.id && remove(e.id)}
                                            className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        <button onClick={() => setSelectedEntrepotDetails(e)} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Voir détails</span>
                                            <Eye size={20} className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Produits stockés:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {e.places.map((place, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                                            >
                                                {place}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => openModal(e.id!)}
                                        className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        <PlusCircle size={18} /> Ajouter un produit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
                    <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
                        <button onClick={() => setModalOpen(false)} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
                            <AiFillCloseCircle size={24} />
                        </button>
                        <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
                            <Maximize size={24} />
                        </button>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Ajouter des produits</h2>
                            {/* <button onClick={() => setModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                                <X size={20} />
                            </button> */}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {availableProducts.map((product) => (
                                <div key={product.id} className="flex flex-col gap-2 border p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.some((p) => p.id === product.id)}
                                            onChange={() => toggleProductSelection(product)}
                                        />
                                        <span className="text-sm flex-1">{product.name}</span>
                                    </div>

                                    {selectedProducts.some((p) => p.id === product.id) && (
                                        <>
                                            <input
                                                type="number"
                                                value={selectedProducts.find((p) => p.id === product.id)?.quantity || 1}
                                                onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                                min="1"
                                            />
                                            <select
                                                value={selectedProducts.find((p) => p.id === product.id)?.place || ''}
                                                onChange={(e) => updatePlace(product.id, e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="">Sélectionner un emplacement</option>
                                                {entrepot.find(e => e.id === selectedEntrepot)?.places.map((place) => (
                                                    <option key={place} value={place}>{place}</option>
                                                ))}
                                            </select>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={confirmSelection}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800"
                            disabled={selectedProducts.some(p => !p.place)}
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL DÉTAILS */}
            {selectedEntrepotDetails && (
                <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
                    <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
                        <button onClick={() => setSelectedEntrepotDetails(null)} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
                            <AiFillCloseCircle size={24} />
                        </button>
                        <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
                            <Maximize size={24} />
                        </button>

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Détails de l'entrepôt</h2>
                            {/* <button onClick={() => setSelectedEntrepotDetails(null)} className="text-gray-600 hover:text-gray-900">
                                <X size={20} />
                            </button> */}
                        </div>

                        <div>
                            <p className="text-sm text-gray-700">
                                <strong>Adresse :</strong> {selectedEntrepotDetails.adress}
                            </p>
                            <h4 className="text-sm font-medium text-gray-700 mt-4">Places disponibles :</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {selectedEntrepotDetails.places?.map((place: any) => (
                                    <li key={place}>
                                        {place}
                                    </li>
                                ))}
                            </ul>

                            <h4 className="text-sm font-medium text-gray-700 mt-4">Produits stockés :</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {selectedEntrepotDetails.products?.map((product: any) => (
                                    <li key={product.id}>
                                        {availableProducts.find(p => p.id === product.id)?.name} - Quantité : {product.quantity} - Emplacement : {product.place}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => setSelectedEntrepotDetails(null)}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
