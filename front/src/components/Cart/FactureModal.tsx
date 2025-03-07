import { CheckCircleIcon, Maximize } from 'lucide-react';
import { AiFillCloseCircle } from 'react-icons/ai';
import resize from '../../utils/maximise';
import { Facture } from '../../store/useFactureStore';
import { useCartStore } from '../../store/useCartStore';
import { useMemo } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  facture: Facture
}

export function FactureModal({ isOpen, onClose, facture }: Props) {
  if (!isOpen) return null;

  const getById = useCartStore.getState().getById

  const carts = useMemo(() => {
    return getById(facture.cartId)
  }, [facture])

  return (
    <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
      <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
          <AiFillCloseCircle size={24} />
        </button>
        <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
          <Maximize size={24} />
        </button>

        <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
          <div
            key={facture.id}
            className="flex flex-col justify-between bg-gray-100 border border-gray-300 rounded-lg p-6 w-72 shadow transform transition-transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            <div>
              <div className="mb-4">
                {/* <h3 className="text-xl font-semibold text-gray-800">Référence: {del.carts?.id}</h3> */}
                <p className="text-gray-600">Client: {carts.client?.name}</p>
                <p className="text-gray-600">
                  Statut:{" "}
                  <span
                    className={`text-${carts.status === "completed"
                      ? "green"
                      : carts.status === "cancelled"
                        ? "red"
                        : "yellow"
                      }-500`}
                  >
                    {carts.status}
                  </span>
                </p>
                <p className="text-gray-600">Créé le: {new Date(carts.createdAt as string).toLocaleDateString()}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Articles:</h4>
                <ul className="list-none">
                  {carts.items?.map(item => (
                    <li key={item.productId} className="text-gray-600">
                      {item.quantity} x {item.unitPrice} - {item.unitPrice}MGA = {item.quantity * item.unitPrice} MGA
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-gray-800 font-semibold">Total: {carts.totalAmount}MGA</p>
              </div>
            </div>

            {carts.isDelivery ?
              <p className="flex justify-end w-full">
                <CheckCircleIcon className="text-lg text-green-500" />
              </p>
              : null
            }


            <button
              onClick={onClose}
              className={"w-full py-1 px-2 rounded-md focus:outline-none opacity-5 bg-zinc-700/20 text-white"}
            >
              retour
            </button>
            :
          </div>
        </div>

      </div>
    </div>
  );
}