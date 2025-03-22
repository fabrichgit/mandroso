import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCaisses, createCaisse, updateCaisse, deleteCaisse } from '../api';
import { Caisse } from '../types';

export default function Caisses() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCaisse, setSelectedCaisse] = React.useState<Caisse | null>(null);

  const { data: caisses, isLoading } = useQuery('caisses', getCaisses);

  const createMutation = useMutation(createCaisse, {
    onSuccess: () => {
      queryClient.invalidateQueries('caisses');
      toast.success('Caisse créée avec succès');
      setIsModalOpen(false);
    },
    onError: () => toast.error('Erreur lors de la création de la caisse'),
  });

  const updateMutation = useMutation(
    (caisse: Caisse) => updateCaisse(caisse.reference, caisse),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('caisses');
        toast.success('Caisse mise à jour avec succès');
        setIsModalOpen(false);
      },
      onError: () => toast.error('Erreur lors de la mise à jour de la caisse'),
    }
  );

  const deleteMutation = useMutation(deleteCaisse, {
    onSuccess: () => {
      queryClient.invalidateQueries('caisses');
      toast.success('Caisse supprimée avec succès');
    },
    onError: () => toast.error('Erreur lors de la suppression de la caisse'),
  });

  // if (isLoading) {
  //   return <div>Chargement...</div>;
  // }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Caisses</h1>
        <button
          onClick={() => {
            setSelectedCaisse(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Caisse
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Référence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solde
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {caisses?.map((caisse) => (
              <tr key={caisse._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {caisse.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {caisse.user_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {caisse.realtime_solde.toLocaleString()} XAF
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedCaisse(caisse);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Êtes-vous sûr de vouloir supprimer cette caisse ?')) {
                        deleteMutation.mutate(caisse.reference);
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">
              {selectedCaisse ? 'Modifier la Caisse' : 'Nouvelle Caisse'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const caisseData = {
                  reference: formData.get('reference') as string,
                  user_id: formData.get('user_id') as string,
                  realtime_solde: Number(formData.get('realtime_solde')),
                };

                if (selectedCaisse) {
                  updateMutation.mutate({ ...selectedCaisse, ...caisseData });
                } else {
                  createMutation.mutate(caisseData);
                }
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Référence
                  </label>
                  <input
                    type="text"
                    name="reference"
                    defaultValue={selectedCaisse?.reference}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <input
                    type="text"
                    name="user_id"
                    defaultValue={selectedCaisse?.user_id}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Solde
                  </label>
                  <input
                    type="number"
                    name="realtime_solde"
                    defaultValue={selectedCaisse?.realtime_solde}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {selectedCaisse ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}