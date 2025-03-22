import { Trash2 } from 'lucide-react';
import { Vendeurs } from '../../types/fournisseur';

interface FounisseurListProps {
  vendeur: Vendeurs[];
  onEdit: (fournisseur: Vendeurs) => void;
  onDelete: (id: string) => void;
}

export function VendeurList({ vendeur: fournisseur, onDelete }: FounisseurListProps) {

  if (fournisseur.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Aucun vendeur enregistré</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              APropos
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fournisseur.map((fs) => (
            <tr key={fs._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {fs.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {/* <button
                  onClick={() => onEdit(fs)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <Pencil className="h-4 w-4" />
                </button> */}
                <button
                  onClick={() => onDelete(fs._id!)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}