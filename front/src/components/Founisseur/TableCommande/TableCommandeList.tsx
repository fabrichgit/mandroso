import { useFournisseurStore } from "../../../store/useFournisseurStore";
import { useProductStore } from "../../../store/useProductStore";
import { TableCommande } from "../../../store/useTableCommandeStore";
import { TbBorderBottomPlus } from "react-icons/tb";
import { MinusCircle, Pencil, Trash2 } from "lucide-react";

interface Props {
  commande: TableCommande[];
  onEdit: (cmd: TableCommande) => void;
  onDelete: (id: string) => void;
  selectedTable: TableCommande[];
  setSelectedTable: React.Dispatch<React.SetStateAction<TableCommande[]>>;
  onCommande: {
    ppp_id: string;
    quantity: number;
  }[];
  setOn: React.Dispatch<
    React.SetStateAction<
      {
        ppp_id: string;
        quantity: number;
      }[]
    >
  >;
}

export function TableCommandeList({
  commande,
  onEdit,
  onDelete,
  onCommande,
  setOn,
}: Props) {
  if (commande?.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Aucune table enregistrée</p>
      </div>
    );
  }

  const getProductById = useProductStore.getState().getById;
  const getProviderById = useFournisseurStore.getState().getById;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fournisseur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {commande?.map((cart) => (
              <tr key={cart._id} className="hover:bg-gray-50">
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
                  {!onCommande.find((on) => on.ppp_id === cart._id) ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          // setSelectedTable((prev) => [cart, ...prev])
                          setOn((prev) => [
                            ...prev,
                            { ppp_id: cart._id!, quantity: 1 },
                          ])
                        }
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Faire une commande"
                      >
                        <TbBorderBottomPlus className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onEdit(cart)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(cart._id!)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <td className="flex items-end gap-3">
                      <div className="flex flex-col justify-start w-max">
                        <label
                          htmlFor="reference"
                          className="text-start inline text-sm font-medium text-gray-700"
                        >
                          quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={
                            onCommande.find((s) => s.ppp_id === cart._id)
                              ?.quantity
                          }
                          onChange={(e) =>
                            setOn((prev) =>
                              prev.map((p) =>
                                p.ppp_id !== cart._id
                                  ? p
                                  : { ...p, quantity: Number(e.target.value) }
                              )
                            )
                          }
                          min={0}
                          step={1}
                          required
                          className="mt-1 inline w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        />
                      </div>
                      <button
                        onClick={() =>
                          setOn((prev) =>
                            prev.filter((p) => p.ppp_id !== cart._id)
                          )
                        }
                        className="text-red-600 hover:text-red-900"
                        title="Faire une commande"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                      {/* <button onClick={commande} className="-translate-y-1 h-max text-white py-1 px-3 rounded-md text-sm bg-orange-500 transition-colors duration-300 hover:bg-orange-600">commander</button>
                        <button onClick={() => setCommanding(false)} className="-translate-y-1 h-max text-white py-1 px-3 rounded-md text-sm bg-slate-500 transition-colors duration-300 hover:bg-slate-600">annuler</button> */}
                    </td>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {selectedCart && selectedCart.action === 'invoice' ? (
                    <Invoice cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
                ) : null}
                {selectedCart && selectedCart.action === 'deliveryNote' ? (
                    <DeliveryNote cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
                ) : null} */}
      </div>
    </>
  );
}
