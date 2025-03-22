import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getMobileBankings, createMobileBanking, updateMobileBanking, deleteMobileBanking } from '../api';
import { MobileBanking } from '../types';

export default function MobileBankings() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedMobileBanking, setSelectedMobileBanking] = React.useState<MobileBanking | null>(null);

  const { data: mobileBankings, isLoading } = useQuery('mobileBankings', getMobileBankings);

  const createMutation = useMutation(createMobileBanking, {
    onSuccess: () => {
      queryClient.invalidateQueries('mobileBankings');
      toast.success('Mobile banking créé avec succès');
      setIsModalOpen(false);
    },
    onError: () => toast.error('Erreur lors de la création du mobile banking'),
  });

  const updateMutation = useMutation(
    (mobileBanking: MobileBanking) => updateMobileBanking(mobileBanking.reference, mobileBanking),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mobileBankings');
        toast.success('Mobile banking mis à jour avec succès');
        setIsModalOpen(false);
      },
      onError: () => toast.error('Erreur lors de la mise à jour du mobile banking'),
    }
  );

  const deleteMutation = useMutation(deleteMobileBanking, {
    onSuccess: () => {
      queryClient.invalidateQueries('mobileBankings');
      toast.success('Mobile banking supprimé avec succès');
    },
    onError: () => toast.error('Erreur lors de la suppression du mobile banking'),
  });

  // if (isLoading) {
  //   return <div>Chargement...</div>;
  // }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion du Mobile Banking</h1>
        <button
          onClick={() => {
            setSelectedMobileBanking(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Mobile Banking
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
                Numéro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opérateur
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
            {mobileBankings?.map((mobileBanking) => (
              <tr key={mobileBanking._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mobileBanking.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mobileBanking.numero}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mobileBanking.operateur}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mobileBanking.realtime_solde.toLocaleString()} XAF
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedMobileBanking(mobileBanking);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Êtes-vous sûr de vouloir supprimer ce mobile banking ?')) {
                        deleteMutation.mutate(mobileBanking.reference);
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
              {selectedMobileBanking ? 'Modifier le Mobile Banking' : 'Nouveau Mobile Banking'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const mobileBankingData = {
                  reference: formData.get('reference') as string,
                  numero: formData.get('numero') as string,
                  operateur: formData.get('operateur') as string,
                  realtime_solde: Number(formData.get('realtime_solde')),
                };

                if (selectedMobileBanking) {
                  updateMutation.mutate({ ...selectedMobileBanking, ...mobileBankingData });
                } else {
                  createMutation.mutate(mobileBankingData);
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
                    defaultValue={selectedMobileBanking?.reference}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Numéro
                  </label>
                  <input
                    type="text"
                    name="numero"
                    defaultValue={selectedMobileBanking?.numero}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Opérateur
                  </label>
                  <select
                    name="operateur"
                    defaultValue={selectedMobileBanking?.operateur}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner un opérateur</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                    <option value="Moov Money">Moov Money</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Solde
                  </label>
                  <input
                    type="number"
                    name="realtime_solde"
                    defaultValue={selectedMobileBanking?.realtime_solde}
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
                  {selectedMobileBanking ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}