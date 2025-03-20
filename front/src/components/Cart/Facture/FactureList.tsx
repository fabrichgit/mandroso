import { useState } from "react";
import { Invoice } from "../Invoice";
import { Cart } from "../../../types/cart";
import { useProductStore } from "../../../store/useProductStore";
import { Facture2 } from "../../../hook/data";
import axios from "axios";
import { api, token } from "../../../constant";
import toast from "react-hot-toast";

type Props = {
  view: "cards" | "table";
  factureList: Facture2[];
  handleSetStatus: (id: string) => void;
  reFetch: () => Promise<void>
};

function FactureList({ factureList, reFetch }: Props) {
  const products = useProductStore((state) => state.products);
  const [selectedCart, setSelectedCart] = useState<{
    cart: Cart;
    action: "invoice" | "deliveryNote";
  } | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Référence
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remise total en valeur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remise total en %
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produits
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {factureList?.map((cart) => (
            <tr key={cart.cardId} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cart.reference}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cart.discountInValue}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cart.discountInPercent} %
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {cart?.isCancelled && (
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800`}
                  >
                    annulée
                  </span>
                )}
                {cart?.isPaid && (
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800`}
                  >
                    payée
                  </span>
                )}
                {cart?.isFactured && (
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                  >
                    facturée
                  </span>
                )}
                {cart?.isDelivery && (
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800`}
                  >
                    delivrée
                  </span>
                )}
                {!cart?.isCancelled &&
                  !cart?.isPaid &&
                  !cart?.isDelivery &&
                  !cart?.isFactured && (
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800`}
                    >
                      aucun
                    </span>
                  )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <ul className="list-disc list-inside">
                  {cart.productDiscounts?.map((item, index) => {
                    const product = products.find(
                      (p) => p._id === item.productId
                    );
                    return product ? <li key={index}>{product.name}</li> : null;
                  })}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {/* {delv.find((del) => del.cartId === cart.id) ? null : (
                  <button
                    onClick={() => delivery(cart)}
                    className="text-orange-600 hover:text-green-900 mr-4"
                    title="bon de livraison"
                  >
                    <FilePlus className="h-4 w-4" />
                  </button>
                )}
                {factures?.find((del) => del.cardId === cart.id) ? null : (
                  <button
                    onClick={() => facture(cart)}
                    className="text-green-600 hover:text-green-900 mr-4"
                    title="creer la facture"
                  >
                    <FileText className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => onEdit(cart)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                  title="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(cart.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </button> */}
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="p-2 inline-flex font-semibold rounded-lg text-sky-100 bg-sky-600"
                  onClick={() =>
                    // @ts-ignore
                    document.getElementById("my_modal_1")!.showModal()
                  }
                >
                  modifier status
                </button>
                {cart ? <ModalDetails cart={cart} reFetch={reFetch}/> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCart && selectedCart.action === "invoice" ? (
        <Invoice
          cart={selectedCart.cart}
          onClose={() => setSelectedCart(null)}
        />
      ) : null}
      {/* {selectedCart && selectedCart.action === 'deliveryNote' ? (
                    <DeliveryNote cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
                ) : null} */}
    </div>
  );

  // return <>
  //     {facture ?
  //         <FactureModal facture={facture} isOpen={!!facture} onClose={() => setFacture(null)} />
  //         :
  //         view === 'cards' ? (
  //             <div className="flex flex-wrap gap-6">
  //                 {factureList.map((fact: any) => (
  //                     <div
  //                         key={fact.id}
  //                         className="flex flex-col justify-between gap-4 bg-gray-100 border border-gray-300 rounded-lg p-6 w-72 shadow transform transition-transform hover:translate-y-[-2px] hover:shadow-lg"
  //                     >
  //                         <div>
  //                             <p className="text-gray-600">Client: {fact.carts.client?.name}</p>
  //                             <p className="text-gray-600">
  //                                 Statut: <span className={`text-${fact.status === "paye" ? "green" : "red"}-500`}>{fact.status}</span>
  //                             </p>
  //                             <p className="text-gray-600">Créé le: {new Date(fact.carts.createdAt as string).toLocaleDateString()}</p>
  //                             <p className="text-gray-800 font-semibold">Total: {fact.carts.totalAmount}MGA</p>
  //                         </div>

  //                         <div className='flex flex-col mt-3 gap-3'>
  //                             {fact.status !== "paye" ? (
  //                                 <button
  //                                     onClick={() => handleSetStatus(fact.cartId)}
  //                                     className="text-sm w-full py-1 px-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition-colors duration-300"
  //                                 >
  //                                     Marquer comme payé
  //                                 </button>
  //                             ) : (
  //                                 <p className="flex justify-end w-full">
  //                                     <CheckCircleIcon className="text-lg text-green-500" />
  //                                 </p>
  //                             )}
  //                             <button
  //                                 onClick={() => setSelectedCart({ cart: fact, action: 'invoice' })}
  //                                 className="text-sm w-full py-1 px-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition-colors duration-300"
  //                             >
  //                                 imprimer
  //                             </button>
  //                             <button
  //                                 onClick={() => setFacture(fact)}
  //                                 className="text-sm w-full py-1 px-2 rounded-md bg-orange-700 text-white hover:bg-orange-600 transition-colors duration-300"
  //                             >
  //                                 voir details
  //                             </button>
  //                         </div>
  //                     </div>
  //                 ))}
  //             </div>
  //         ) : (
  //             <div className="overflow-x-auto">
  //                 <table className="min-w-full bg-white border border-gray-300">
  //                     <thead>
  //                         <tr className="bg-gray-100">
  //                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
  //                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
  //                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
  //                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
  //                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
  //                         </tr>
  //                     </thead>
  //                     <tbody>
  //                         {factureList.map((fact: any) => (
  //                             <tr key={fact.id} className="border-b hover:bg-gray-50">
  //                                 <td className="px-6 py-3 text-sm text-gray-600">{fact.carts.client?.name}</td>
  //                                 <td className="px-6 py-3 text-sm">
  //                                     <span className={`text-${fact.status === "paye" ? "green" : "red"}-500`}>{fact.status}</span>
  //                                 </td>
  //                                 <td className="px-6 py-3 text-sm text-gray-800">{fact.carts.totalAmount}MGA</td>
  //                                 <td className="px-6 py-3 text-sm text-gray-600">
  //                                     {new Date(fact.carts.createdAt as string).toLocaleDateString()}
  //                                 </td>
  //                                 <td className="px-6 py-3 text-sm">
  //                                     <button
  //                                         onClick={() => setFacture(fact)}
  //                                         className="text-sm w-max py-1 px-2 rounded-md bg-orange-700 text-white hover:bg-orange-600 transition-colors duration-300"
  //                                     >
  //                                         voir details
  //                                     </button>
  //                                     {fact.status !== "paye" ? (
  //                                         <button
  //                                             onClick={() => handleSetStatus(fact.id!)}
  //                                             className="mx-2 text-white py-1 px-3 rounded-md text-sm bg-blue-500 transition-colors duration-300 hover:bg-blue-600"
  //                                         >
  //                                             Marquer payé
  //                                         </button>
  //                                     ) : (
  //                                         <CheckCircleIcon className="text-lg text-green-500 inline ml-3" />
  //                                     )}
  //                                 </td>
  //                             </tr>
  //                         ))}
  //                     </tbody>
  //                 </table>
  //             </div>
  //         )}
  //     {selectedCart && selectedCart.action === 'invoice' ? (
  //         <Invoice cart={selectedCart.cart} onClose={() => setSelectedCart(null)} />
  //     ) : null}
  // </>
}

export default FactureList;

function ModalDetails({cart, reFetch}: {cart: Facture2, reFetch: () => Promise<void>}) {

  const updateStatus = async (field: string, status: boolean) => {
    const predata = {
      isCancelled: cart.isCancelled,
      isDelivery: cart.isDelivery,
      isFactured: cart.isFactured,
    }

    const data = {
      ...predata, [field]: status
    }

    // @ts-ignore
    await axios.patch(api()+"/factures/status/"+cart._id, data, {
      headers: {
        Authorization: token()
      }
    })
    .then(() => {
      toast.success('')
      reFetch()
    })
    .catch(() => toast.error(''))
  }

  console.log(cart.isFactured, Boolean(cart.isCancelled) === true, cart.isDelivery);
  

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box flex flex-col gap-4">
        <h3 className="font-bold text-lg text-start">Modifier un status</h3>
        {(cart?.isCancelled) ? null : (
          <button onClick={async () => await updateStatus('isCancelled', true)} className="p-3 font-semibold rounded-lg text-red-100 bg-red-600">
            annuler
          </button>
        )}
        {/* {!cart.isPaid && (
          <button onClick={async () => await updateStatus('isPaid', true)} className="p-2 font-semibold rounded-lg text-yellow-100 bg-yellow-600">
            payer
          </button>
        )} */}
        {(cart?.isFactured) ? null : (
          <button onClick={async () => await updateStatus('isFactured', true)} className="p-2 font-semibold rounded-lg text-green-100 bg-green-600">
            facturer
          </button>
        )}
        {
          !cart?.isDelivery
            ? null :
          <button onClick={async () => await updateStatus('isDelivery', true)} className="p-2 font-semibold rounded-lg text-sky-100 bg-sky-600">
            delivrer
          </button>
        }

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">fermer</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
