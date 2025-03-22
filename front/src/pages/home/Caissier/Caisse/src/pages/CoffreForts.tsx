import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCoffreForts, createCoffreFort, updateCoffreFort, deleteCoffreFort } from '../api';
import { CoffreFort } from '../types';

export default function CoffreForts() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCoffreFort, setSelectedCoffreFort] = React.useState<CoffreFort | null>(null);

  const { data: coffreForts, isLoading } = useQuery('coffreForts', getCoffreForts);

  const createMutation = useMutation(createCoffreFort, {
    onSuccess: () => {
      queryClient.invalidateQueries('coffreForts');
      toast.success('Coffre-fort créé avec succès');
      setIsModalOpen(false);
    },
    onError: () => toast.error('Erreur lors de la création du coffre-fort'),
  });

  const updateMutation = useMutation(
    (coffreFort: CoffreFort) => updateCoffreFort(coffreFort.reference, coffreFort),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('coffreForts');
        toast.success('Coffre-fort mis à jour avec succès');
        setIsModalOpen(false);
      },
      onError: () => toast.error('Erreur lors de la mise à jour du coffre-fort'),
    }
  );

  const deleteMutation = useMutation(deleteCoffreFort, {
    onSuccess: () => {
      queryClient.invalidateQueries('coffreForts');
      toast.success('Coffre-fort supprimé avec succès');
    },
    onError: () => toast.error('Erreur lors de la suppression du coffre-fort'),
  });

  // if (isLoading) {
  //   return <div>Chargement...</div>;
  // }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Coffre-forts</h1>
        <button
          onClick={() => {
            setSelectedCoffreFort(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Coffre-fort
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
                Solde
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coffreForts?.map((coffreFort) => (
              <tr key={coffreFort._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coffreFort.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coffreFort.realtime_solde.toLocaleString()} XAF
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedCoffreFort(coffreFort);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Êtes-vous sûr de vouloir supprimer ce coffre-fort ?')) {
                        deleteMutation.mutate(coffreFort.reference);
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
              {selectedCoffreFort ? 'Modifier le Coffre-fort' : 'Nouveau Coffre-fort'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const coffreFortData = {
                  reference: formData.get('reference') as string,
                  realtime_solde: Number(formData.get('realtime_solde')),
                };

                if (selectedCoffreFort) {
                  updateMutation.mutate({ ...selectedCoffreFort, ...coffreFortData });
                } else {
                  createMutation.mutate(coffreFortData);
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
                    defaultValue={selectedCoffreFort?.reference}
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
                    defaultValue={selectedCoffreFort?.realtime_solde}
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
                  {selectedCoffreFort ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}