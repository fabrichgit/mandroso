import { Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  categorie?: string
}

export function ProductCard({ product, onEdit, onDelete, categorie }: ProductCardProps) {
  const getConditionLabel = (condition: Product['condition']) => {
    switch (condition) {
      case 'neuf':
        return 'Neuf';
      case 'usagé':
        return 'Usagé';
      case 'reconditionné':
        return 'Reconditionné';
      default:
        return condition;
    }
  };

  const getConditionColor = (condition: Product['condition']) => {
    switch (condition) {
      case 'neuf':
        return 'bg-green-100 text-green-800';
      case 'usagé':
        return 'bg-yellow-100 text-yellow-800';
      case 'reconditionné':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">Quantité: {product.quantity}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
            {getConditionLabel(product.condition)}
          </span>
        </div>

        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {categorie}
          </span>
          <span className="ml-2 text-sm text-gray-500">{product.brand}</span>
        </div>

        <p className="mt-2 text-gray-500 text-sm line-clamp-2">{product.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-sm">
            <p className="text-gray-500">Dimensions</p>
            <p className="font-medium">{product.dimensions}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">Poids</p>
            <p className="font-medium">{product.weight} kg</p>
          </div>
        </div>

        {product.materials ? <div className="mt-2">
          <p className="text-sm text-gray-500">Matériaux</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {product.materials.map((material, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {material}
              </span>
            ))}
          </div>
        </div> : null}

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Modifier
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}