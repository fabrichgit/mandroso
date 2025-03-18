import { Minus, Pencil, PlusSquare, Trash2 } from "lucide-react";
import { Product } from "../../types/product";
import { useState } from "react";
import ModalImages from "./ModalImages";
import { ProductCardProps } from "./ProductCard";
import { useDeliveryStore } from "../../store/useDeliveryStore";
import { useEntrepot } from "../../store/useEntrepot";
import { Category } from "../../types/category";

interface Props {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  oncartin: boolean;
  handleAddItem: (product: Product) => void;
  handleRemoveItem: (productId: string) => void;
  handleItemChange: (productId: string, field: any, value: string | number) => void
}

export default function TableProductList({ products, categories, onEdit, onDelete, handleAddItem, handleItemChange, handleRemoveItem, oncartin }: Props) {

  const [see, setSee] = useState<boolean>(false);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Nom</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Quantité en stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Quantité a stocker</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Quantité réservé</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Quantité commandé</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Prix unitaire</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Condition</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Catégorie</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Marque</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Poids</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Photos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products?.map((product) => (
              see && product.images ? <ModalImages images={product.images} onClose={() => setSee(false)} /> :
                <ProductElement
                  product={product}
                  categorie={categories?.find(cg => cg._id === product.category)?.name}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  oncartin={oncartin}
                  handleAddItem={handleAddItem}
                  handleRemoveItem={handleRemoveItem}
                  handleItemChange={handleItemChange}
                />

            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function getConditionColor(condition: string) {
  switch (condition) {
    case "Neuf":
      return "bg-green-100 text-green-800";
    case "Occasion":
      return "bg-yellow-100 text-yellow-800";
    case "Endommagé":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getConditionLabel(condition: string) {
  return condition || "Inconnu";
}

function ProductElement({ product, onEdit, onDelete, categorie, oncartin, handleAddItem, handleRemoveItem, handleItemChange }: ProductCardProps) {

  const countProductByDeliveryStatus = useDeliveryStore.getState().countProductByDeliveryStatus
  // const countProductInCommandes = useCommandeStore.getState().countProductInCommandes
  const countProductInCommandes = (_: any) => 10
  const countProductQuantity = useEntrepot.getState().countProductQuantity

  const [see, setSee] = useState<boolean>(false);
  const [itCart, setIt] = useState(false)

  return (
    <tr key={product._id} className="hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{countProductQuantity(product._id!)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">12</td>
      <td className="px-4 py-3 text-sm text-gray-600">{countProductByDeliveryStatus(product._id!, false)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{countProductInCommandes(product._id)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{product.price} ar</td>
      <td className="px-4 py-3 text-sm">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
          {getConditionLabel(product.condition)}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {categorie || "Non défini"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{product.brand}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{product.weight} kg</td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {see ? null : product.images ?
          <div onClick={() => setSee(true)} className="avatar-group -space-x-6 rtl:space-x-reverse z-0 hover:bg-gray-200 p-2 w-max rounded-lg cursor-pointer">
            {product.images.slice(0, 3).map(url => (
              <div className="avatar">
                <div className="w-9">
                  <img src={url} />
                </div>
              </div>
            ))}
            {
              product.images?.length > 3 ?
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-9">
                    <span>+{product.images?.length - 3}</span>
                  </div>
                </div>
                : null
            }
          </div>
          : 'null'
        }
      </td>
      <td className="px-4 py-3 text-sm flex space-x-2">
        {oncartin ?
          !itCart ?
            <button className='inline w-max h-max' onClick={() => {
              setIt(i => !i);
              handleAddItem(product);
            }}>
              <PlusSquare className='text-sky-600' />
            </button>
            :
            <button className='inline w-max h-max' onClick={() => {
              setIt(i => !i);
              handleRemoveItem(product._id!);
            }}>
              <Minus className='text-red-500' />
            </button>
          : null}
        {itCart ?
          <div className='flex items-start gap-2 w-full'>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prix unitaire
              </label>
              <input
                type="number"
                name="price"
                defaultValue={product.price}
                onChange={(e) => handleItemChange(product._id!, 'unitPrice', parseFloat(e.target.value))}
                className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={1}
                className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => handleItemChange(product._id!, 'quantity', parseInt(e.target.value))}
              />
            </div>
          </div> : null}
        {
          oncartin ? null :
            <>
              <button
                onClick={() => onEdit(product)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center"
              >
                <Pencil className="h-4 w-4 mr-1" />
              </button>
              <button
                onClick={() => onDelete(product._id!)}
                className="px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
              </button>
            </>
        }
      </td>
    </tr>
  )
}