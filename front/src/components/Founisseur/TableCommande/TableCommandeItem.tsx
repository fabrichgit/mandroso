import { MinusCircle, Pencil, Trash2 } from "lucide-react"
import { TableCommande } from "../../../store/useTableCommandeStore"
import { TbBorderBottomPlus } from "react-icons/tb";
import { useProductStore } from "../../../store/useProductStore";
import { useFournisseurStore } from "../../../store/useFournisseurStore";

function TableCommandeItem({ cart, onDelete, onEdit, selectedTable, setSelectedTable }: {
    cart: TableCommande, selectedTable: TableCommande[];
    setSelectedTable: React.Dispatch<React.SetStateAction<TableCommande[]>>, onEdit: (cmd: TableCommande) => void, onDelete: (id: string) => void
}) {

    const getProductById = useProductStore.getState().getById
    const getProviderById = useFournisseurStore.getState().getById

    // const add = useCommandeStore.getState().add;
    const onCommande = !!selectedTable.find(s => s.id === cart.id)
    // const [formData, setFormData] = useState<Commande>({
    //     id: Date.now().toString(),
    //     createdAt: String(new Date()),
    //     quantity: 1,
    //     table: cart,
    //     status: "pending"
    // })

    // const commande = () => {
    //     add(formData);
    //     setFormData({
    //         id: Date.now().toString(),
    //         createdAt: String(new Date()),
    //         quantity: 1,
    //         table: cart,
    //         status: "pending"
    //     });
    //     setCommanding(false);
    // }

    return (
        <tr key={cart.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {getProviderById(cart.provider_id)?.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {getProductById(cart.product_id)?.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cart.price} MGA
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {
                    onCommande ?
                        <div className="flex items-center gap-3">

                            {!!!selectedTable.find(s => s.id === cart.id) ? <button
                                onClick={() => setSelectedTable(prev => [cart, ...prev])}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Faire une commande"
                            >
                                <TbBorderBottomPlus className="h-5 w-5" />
                            </button> : <button
                                onClick={() => setSelectedTable(prev => prev.filter(p => p.id !== cart.id))}
                                className="text-red-600 hover:text-red-900"
                                title="Faire une commande"
                            >
                                <MinusCircle className="h-5 w-5" />
                            </button>}
                            <button
                                onClick={() => onEdit(cart)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Modifier"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => onDelete(cart.id!)}
                                className="text-red-600 hover:text-red-900"
                                title="Supprimer"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        :
                        <td className="flex items-end gap-3">
                            <div className="flex flex-col justify-start w-max">
                                <label htmlFor="reference" className="text-start inline text-sm font-medium text-gray-700">
                                    quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    // value={(selectedTable.find(s =>)createdAt as string)}
                                    // value={selectedTable.find(s => s.id === cart.id)?.}
                                    onChange={(e) => setSelectedTable(prev => prev.map(p => p.id !== cart.id ? p : {...p, createdAt: e.target?.value}))}
                                    min={0}
                                    step={1}
                                    required
                                    className="mt-1 inline w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex flex-col justify-start w-max">
                                <label htmlFor="reference" className="text-start inline text-sm font-medium text-gray-700">
                                    date
                                </label>
                                <input
                                    type="date"
                                    id="createdAt"
                                    name='createdAt'
                                    // value={(formData.createdAt as string)}
                                    // onChange={(e) => setFormData(prev => ({ ...prev, createdAt: e.target.value }))}
                                    required
                                    className="mt-1 inline w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                />
                            </div>
                            {/* <button onClick={commande} className="-translate-y-1 h-max text-white py-1 px-3 rounded-md text-sm bg-orange-500 transition-colors duration-300 hover:bg-orange-600">commander</button>
                            <button onClick={() => setCommanding(false)} className="-translate-y-1 h-max text-white py-1 px-3 rounded-md text-sm bg-slate-500 transition-colors duration-300 hover:bg-slate-600">annuler</button> */}
                        </td>
                }
            </td>
        </tr>
    )
}

export default TableCommandeItem
