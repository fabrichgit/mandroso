import { CheckCircleIcon, FileCheck } from "lucide-react";
import { FaTable } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { reactiveClass, reactiveClassV2 } from "../../../../utils/class";
import useStorage from "../../../../hook/useStorage";
import { useDeliveryStore } from "../../../../store/useDeliveryStore";
import { useCartStore } from "../../../../store/useCartStore";
import { useMemo } from "react";
import { useClientStore } from "../../../../store/useClientStore";
import { user_store } from "../../../../store/user";

function Delivery() {
  const me = user_store.getState().data
  const { carts } = useCartStore();
  const { delivery, validate } = useDeliveryStore();
  const { getById } = useClientStore()
  const { setTab: setView, tab: view } = useStorage<'cards' | 'table'>('cards', 'del');

  const deliveries = useMemo(() => {
    return delivery.map(del => ({ ...del, carts: { ...carts.find(ct => ct.id === del.cartId), client: getById(carts.find(ct => ct.id === del.cartId)?.clientId!) } }))
  }, [carts, delivery])

  const handleValidate = (id: string) => {
    validate(id)
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8 w-full">
        <div className="flex items-center pb-0">
          <FileCheck className="h-5 w-5 text-sky-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">
            Bon de livraison
          </h1>
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
          {deliveries
            .map(del => (
              <div
                key={del.id}
                className="flex flex-col justify-between bg-gray-100 border border-gray-300 rounded-lg p-6 w-72 shadow transform transition-transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                <div>
                  <div className="mb-4">
                    {/* <h3 className="text-xl font-semibold text-gray-800">Référence: {del.carts?.id}</h3> */}
                    <p className="text-gray-600">Client: {del.carts.client?.name}</p>
                    <p className="text-gray-600">
                      Statut:{" "}
                      <span
                        className={`text-${del.carts.status === "completed"
                          ? "green"
                          : del.carts.status === "cancelled"
                            ? "red"
                            : "yellow"
                          }-500`}
                      >
                        {del.carts.status}
                      </span>
                    </p>
                    <p className="text-gray-600">Créé le: {new Date(del.carts.createdAt as string).toLocaleDateString()}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Articles:</h4>
                    <ul className="list-none">
                      {del.carts.items?.map(item => (
                        <li key={item.productId} className="text-gray-600">
                          {item.quantity} x {item.unitPrice} - {item.unitPrice}MGA = {item.quantity * item.unitPrice} MGA
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-800 font-semibold">Total: {del.carts.totalAmount}MGA</p>
                  </div>
                </div>

                {!del.carts.isDelivery ?
                  <button
                    disabled={!!del.validation.find(vl => vl.ID === me?.ID)}
                    onClick={() => handleValidate(del.carts.id!)}
                    className={"w-full py-1 px-2 rounded-md focus:outline-none " + reactiveClassV2(!!del.validation.find(vl => vl.ID === me?.ID), 'opacity-5 bg-zinc-700/20 text-white', 'transition-colors duration-300 hover:bg-orange-600 bg-zinc-700 text-white')}
                  >
                    Valider
                  </button>
                  :
                  <p className="flex justify-end w-full">
                    <CheckCircleIcon className="text-lg text-green-500" />
                  </p>
                }
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
              {deliveries
                .map(del => (
                  <tr key={del.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-600">{del.carts.client?.name}</td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`text-${del.carts.status === "completed"
                          ? "green"
                          : del.carts.status === "cancelled"
                            ? "red"
                            : "yellow"
                          }-500`}
                      >
                        {del.carts.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800">{del.carts.totalAmount}MGA</td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {new Date(del.carts.createdAt as string).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      {!del.carts.isDelivery ?
                        <button
                          disabled={!!del.validation.find(vl => vl.ID === me?.ID)}
                          onClick={() => handleValidate(del.carts.id!)}
                          className={"text-white py-1 px-3 rounded-md text-sm " + reactiveClassV2(!!del.validation.find(vl => vl.ID === me?.ID), 'opacity-5 bg-zinc-700/20 text-white', 'bg-orange-500 transition-colors duration-300 hover:bg-orange-600')}
                        >
                          Valider
                        </button>
                        : <CheckCircleIcon className="text-lg text-green-500" />
                      }
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

export default Delivery;
