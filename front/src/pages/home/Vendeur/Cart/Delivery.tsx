import { FileCheck } from "lucide-react";
import { FaTable } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { reactiveClass } from "../../../../utils/class";
import useStorage from "../../../../hook/useStorage";

// Définition des types
export interface CartItem {
  productId: string;
  quantity: number;
  unitPrice: number; // Prix unitaire au moment de la commande
}

export interface Cart {
  id: string;
  reference: string;
  clientId: string;
  items: CartItem[];
  status: "pending" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: string;
  isDelivery?: boolean;
}

// Exemple de données pour les carts
const carts: Cart[] = [
  {
    id: "1",
    reference: "REF123",
    clientId: "CLIENT1",
    items: [
      { productId: "prod1", quantity: 2, unitPrice: 20 },
      { productId: "prod2", quantity: 1, unitPrice: 50 }
    ],
    status: "pending",
    totalAmount: 90,
    createdAt: "2025-03-01T10:00:00Z",
    isDelivery: true
  },
  {
    id: "2",
    reference: "REF124",
    clientId: "CLIENT2",
    items: [
      { productId: "prod3", quantity: 1, unitPrice: 100 }
    ],
    status: "completed",
    totalAmount: 100,
    createdAt: "2025-03-02T12:00:00Z",
    isDelivery: true
  },
  // Ajoute d'autres carts ici
];

function Delivery() {
  const { setTab: setView, tab: view } = useStorage<'cards' | 'table'>('cards', 'del'); // État pour alterner le mode d'affichage

  const handleValidate = (id: string) => {
    console.log(`Validation de la commande ${id}`);
    // Logique de validation ici
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
          {carts
            .filter(cart => cart.isDelivery === true)
            .map(cart => (
              <div
                key={cart.id}
                className="flex flex-col justify-between bg-gray-100 border border-gray-300 rounded-lg p-6 w-72 shadow transform transition-transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Référence: {cart.reference}</h3>
                    <p className="text-gray-600">Client: {cart.clientId}</p>
                    <p className="text-gray-600">
                      Statut:{" "}
                      <span
                        className={`text-${cart.status === "completed"
                          ? "green"
                          : cart.status === "cancelled"
                            ? "red"
                            : "yellow"
                          }-500`}
                      >
                        {cart.status}
                      </span>
                    </p>
                    <p className="text-gray-600">Créé le: {new Date(cart.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Articles:</h4>
                    <ul className="list-none">
                      {cart.items.map(item => (
                        <li key={item.productId} className="text-gray-600">
                          {item.quantity} x {item.productId} - {item.unitPrice}€ = {item.quantity * item.unitPrice} MGA
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-800 font-semibold">Total: {cart.totalAmount}MGA</p>
                  </div>
                </div>

                <button
                  onClick={() => handleValidate(cart.id)}
                  className="w-full bg-zinc-700 text-white py-1 px-2 rounded-md transition-colors duration-300 hover:bg-orange-600 focus:outline-none"
                >
                  Valider
                </button>
              </div>
            ))}
        </div>
      ) : (

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Référence</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {carts
                .filter(cart => cart.isDelivery === true)
                .map(cart => (
                  <tr key={cart.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-800">{cart.reference}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{cart.clientId}</td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`text-${cart.status === "completed"
                          ? "green"
                          : cart.status === "cancelled"
                            ? "red"
                            : "yellow"
                          }-500`}
                      >
                        {cart.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800">{cart.totalAmount}MGA</td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {new Date(cart.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <button
                        onClick={() => handleValidate(cart.id)}
                        className="bg-orange-500 text-white py-1 px-3 rounded-md text-sm transition-colors duration-300 hover:bg-orange-600"
                      >
                        Valider
                      </button>
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
