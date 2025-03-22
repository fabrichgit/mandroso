import { FileCheck } from "lucide-react";
import { FaTable } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { reactiveClass } from "../../../../utils/class";
import useStorage from "../../../../hook/useStorage";
import { useDeliveryStore } from "../../../../store/useDeliveryStore";
import { useEffect } from "react";
import { useProductStore } from "../../../../store/useProductStore";
import { useDelivery } from "../../../../hook/data";

function Delivery() {
  const products = useProductStore((state) => state.products);  
  // const me = user_store.getState().data;
  // const { carts, getById } = useCartStore();
  const { delivery, validate, setDelivery } = useDeliveryStore();
  // const { getById } = useClientStore()
  const { setTab: setView, tab: view } = useStorage<"cards" | "table">(
    "table",
    "del"
  );

  const { data } = useDelivery();

  useEffect(() => {
    setDelivery(data);
  }, [data]);

  console.log(delivery);
  

  // @ts-ignore
  const handleValidate = (id: string) => {
    validate(id);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8 w-full">
        <div className="flex items-center pb-0">
          <FileCheck className="h-5 w-5 text-sky-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Bon de livraison</h1>
        </div>

        <div className="flex w-max p-1 bg-neutral-100 border rounded-lg mx-2">
          <button
            title="voir en tant que tableau"
            onClick={() => setView("table")}
            className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass(
              "table",
              view,
              "bg-white border",
              ""
            )}`}
          >
            <FaTable />
          </button>
          <button
            title="voir en tant que carte"
            onClick={() => setView("cards")}
            className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass(
              "cards",
              view,
              "bg-white border",
              ""
            )}`}
          >
            <MdOutlineDashboard />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Référence
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
            {delivery?.map((cart) => (
              <tr key={cart.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cart.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc list-inside">
                    {cart.product_list?.map((item, index) => {
                      const product = products.find(
                        (p) => p._id === item.product_id
                      );
                      return product ? (
                        <li key={index}>{item.quantity}x {product.name}</li>
                      ) : null;
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
                  {/* <button
                    className="p-2 inline-flex font-semibold rounded-lg text-sky-100 bg-sky-600"
                    onClick={() =>
                      // @ts-ignore
                      document.getElementById("my_modal_1")!.showModal()
                    }
                  >
                    modifier status
                  </button>
                  {cart ? (
                    <ModalDetails cart={cart} reFetch={reFetch} />
                  ) : null} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Delivery;
