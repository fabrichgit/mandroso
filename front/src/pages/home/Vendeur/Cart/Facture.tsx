import { CheckCircleIcon, FileCheck } from "lucide-react";
import { FaTable } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { reactiveClass } from "../../../../utils/class";
import useStorage from "../../../../hook/useStorage";
import { useFactureStore } from "../../../../store/useFactureStore";
import { useCartStore } from "../../../../store/useCartStore";
import { useMemo } from "react";
import { useClientStore } from "../../../../store/useClientStore";

function Facture() {
    const { carts } = useCartStore();
    const { factures, setStatus } = useFactureStore((state) => ({
        factures: state.factures,
        setStatus: state.setStatus,
    }));
    const { getById } = useClientStore();
    const { setTab: setView, tab: view } = useStorage<'cards' | 'table'>('cards', 'fact');

    const factureList = useMemo(() => {
        return factures.map(fact => ({
            ...fact,
            carts: {
                ...carts.find(ct => ct.id === fact.cartId),
                client: getById(carts.find(ct => ct.id === fact.cartId)?.id!)
            }
        }));
    }, [carts, factures]);

    const handleSetStatus = (id: string) => {
        setStatus(id, "paye");
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-8 w-full">
                <div className="flex items-center pb-0">
                    <FileCheck className="h-5 w-5 text-sky-500 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-900">Factures</h1>
                </div>

                <div className="flex w-max p-1 bg-neutral-100 border rounded-lg mx-2">
                    <button
                        title="voir en tant que tableau"
                        onClick={() => setView("table")}
                        className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass('table', view, 'bg-white border', '')}`}
                    >
                        <FaTable />
                    </button>
                    <button
                        title="voir en tant que carte"
                        onClick={() => setView("cards")}
                        className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass('cards', view, 'bg-white border', '')}`}
                    >
                        <MdOutlineDashboard />
                    </button>
                </div>
            </div>

            {view === 'cards' ? (
                <div className="flex flex-wrap gap-6">
                    {factureList.map(fact => (
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

                            {fact.status !== "paye" ? (
                                <button
                                    onClick={() => handleSetStatus(fact.cartId)}
                                    className="w-full py-1 px-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition-colors duration-300"
                                >
                                    Marquer comme payé
                                </button>
                            ) : (
                                <p className="flex justify-end w-full">
                                    <CheckCircleIcon className="text-lg text-green-500" />
                                </p>
                            )}
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
                            {factureList.map(fact => (
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
                                        {fact.status !== "paye" ? (
                                            <button
                                                onClick={() => handleSetStatus(fact.id!)}
                                                className="text-white py-1 px-3 rounded-md text-sm bg-blue-500 transition-colors duration-300 hover:bg-blue-600"
                                            >
                                                Marquer comme payé
                                            </button>
                                        ) : (
                                            <CheckCircleIcon className="text-lg text-green-500" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Facture;
