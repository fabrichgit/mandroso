import { CheckCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Facture } from '../../../store/useFactureStore';
import { FactureModal } from './FactureModal';
import { Invoice } from '../Invoice';
import { Cart } from '../../../types/cart';

type Props = {
    view: "cards" | "table";
    factureList: any;
    handleSetStatus: (id: string) => void;
}

function FactureList({ view, factureList, handleSetStatus }: Props) {

    const [selectedCart, setSelectedCart] = useState<{ cart: Cart, action: 'invoice' | 'deliveryNote' } | null>(null);
    const [facture, setFacture] = useState<Facture | null>()

    return <>
        {facture ?
            <FactureModal facture={facture} isOpen={!!facture} onClose={() => setFacture(null)} />
            :
            view === 'cards' ? (
                <div className="flex flex-wrap gap-6">
                    {factureList.map((fact: any) => (
                        <div
                            key={fact.id}
                            className="flex flex-col justify-between gap-4 bg-gray-100 border border-gray-300 rounded-lg p-6 w-72 shadow transform transition-transform hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            <div>
                                <p className="text-gray-600">Client: {fact.carts.client?.name}</p>
                                <p className="text-gray-600">
                                    Statut: <span className={`text-${fact.status === "paye" ? "green" : "red"}-500`}>{fact.status}</span>
                                </p>
                                <p className="text-gray-600">Créé le: {new Date(fact.carts.createdAt as string).toLocaleDateString()}</p>
                                <p className="text-gray-800 font-semibold">Total: {fact.carts.totalAmount}MGA</p>
                            </div>

                            <div className='flex flex-col mt-3 gap-3'>
                                {fact.status !== "paye" ? (
                                    <button
                                        onClick={() => handleSetStatus(fact.cartId)}
                                        className="text-sm w-full py-1 px-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition-colors duration-300"
                                    >
                                        Marquer comme payé
                                    </button>
                                ) : (
                                    <p className="flex justify-end w-full">
                                        <CheckCircleIcon className="text-lg text-green-500" />
                                    </p>
                                )}
                                <button
                                    onClick={() => setSelectedCart({ cart: fact, action: 'invoice' })}
                                    className="text-sm w-full py-1 px-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition-colors duration-300"
                                >
                                    imprimer
                                </button>
                                <button
                                    onClick={() => setFacture(fact)}
                                    className="text-sm w-full py-1 px-2 rounded-md bg-orange-700 text-white hover:bg-orange-600 transition-colors duration-300"
                                >
                                    voir details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factureList.map((fact: any) => (
                                <tr key={fact.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-3 text-sm text-gray-600">{fact.carts.client?.name}</td>
                                    <td className="px-6 py-3 text-sm">
                                        <span className={`text-${fact.status === "paye" ? "green" : "red"}-500`}>{fact.status}</span>
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-800">{fact.carts.totalAmount}MGA</td>
                                    <td className="px-6 py-3 text-sm text-gray-600">
                                        {new Date(fact.carts.createdAt as string).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3 text-sm">
                                        <button
                                            onClick={() => setFacture(fact)}
                                            className="text-sm w-max py-1 px-2 rounded-md bg-orange-700 text-white hover:bg-orange-600 transition-colors duration-300"
                                        >
                                            voir details
                                        </button>
                                        {fact.status !== "paye" ? (
                                            <button
                                                onClick={() => handleSetStatus(fact.id!)}
                                                className="mx-2 text-white py-1 px-3 rounded-md text-sm bg-blue-500 transition-colors duration-300 hover:bg-blue-600"
                                            >
                                                Marquer payé
                                            </button>
                                        ) : (
                                            <CheckCircleIcon className="text-lg text-green-500 inline ml-3" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        {selectedCart && selectedCart.action === 'invoice' ? (
            <Invoice cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
        ) : null}
    </>
}

export default FactureList