import { Pencil, Trash2 } from 'lucide-react';
import { Fournisseur } from '../../types/fournisseur';

interface FounisseurListProps {
  fournisseur: Fournisseur[];
  onEdit: (fournisseur: Fournisseur) => void;
  onDelete: (id: string) => void;
}

export function FounisseurList({ fournisseur, onEdit, onDelete }: FounisseurListProps) {

  if (fournisseur.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Aucun fournisseur enregistré</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
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
              Compte
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Adresse
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Crédit de base
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Délai de livraison
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NIF
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              STAT
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fournisseur.map((fs) => (
            <tr key={fs.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {fs.nom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.telephone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.compte}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.adresse}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.credit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.livraison}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.nif && fs.nif}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fs.stat && fs.stat}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(fs)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(fs.id!)}
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