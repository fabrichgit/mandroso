import { AiFillCloseCircle } from "react-icons/ai";
import { Product } from "../../../api/product.service.api";
import { Maximize } from "lucide-react";
import resize from "../../../utils/maximise";
import { useState } from "react";
import axios from "axios";
import { api, token } from "../../../constant";
import toast from "react-hot-toast";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  products: Partial<Product>[];
  cartId?: string
}

function CreateFactureModal({ onClose, products, cartId }: Props) {
  const [formData, setFormData] = useState<{
    discountInPercent: number;
    discountInValue: number;
    productDiscounts: {
      discountInPercent: number;
      discountInValue: number;
      productId: string;
    }[];
    reference: string;
    cartId?: string
  }>({
    discountInPercent: 0,
    discountInValue: 0,
    reference: Date.now().toString(),
    productDiscounts: products?.map(prod => ({productId: prod?._id!, discountInPercent: 0, discountInValue: 0})),
    cartId
  });

  console.log(products);
  

  const submit = async () => {
    await axios.post(api()+"/factures/", formData, {
      headers: {
        Authorization: token()
      }
    })
    .then(() => {
      toast.success('')
      onClose()
    })
    .catch(() => {
      toast.error('')
    })
  };

  return (
    <div className="fixed z-[100] flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
      <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-800"
        >
          <AiFillCloseCircle size={24} />
        </button>
        <button
          type="button"
          onClick={resize}
          className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          title="pleine ecran"
        >
          <Maximize size={24} />
        </button>

        <div className="flex flex-col gap-5 bg-white px-4 pb-4 pt-5 sm:p-6 w-full h-full">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Total :</h2>
            <div className="flex gap-4 w-full">
              <input
                value={Number(formData?.discountInValue)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountInValue: Number(e.currentTarget.value),
                  }))
                }
                placeholder="remise en valeur"
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <input
                value={Number(formData?.discountInPercent)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountInPercent: Number(e.currentTarget.value),
                  }))
                }
                placeholder="remise en %"
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            {products?.map((prod) => (
              <div className="flex flex-col gap-2">
                <h2 className="font-bold">{prod?.name} :</h2>
                <div className="flex gap-4 w-full">
                  <input
                    value={Number(formData?.productDiscounts?.find(p => p.productId === prod._id)?.discountInValue)}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        productDiscounts: prev.productDiscounts.map(pr => ({...pr, discountInValue: Number(e.currentTarget.value)}))
                      }))
                    }
                    placeholder="remise en valeur"
                    type="number"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <input
                    value={Number(formData?.productDiscounts?.find(p => p.productId === prod._id)?.discountInPercent)}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        productDiscounts: prev.productDiscounts.map(pr => ({...pr, discountInPercent: Number(e.currentTarget.value)}))
                      }))
                    }
                    placeholder="remise en %"
                    type="number"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <button onClick={submit} className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800">
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFactureModal;
