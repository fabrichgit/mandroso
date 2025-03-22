import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getBanks, createBank, updateBank, deleteBank } from '../api';
import { Bank } from '../types';

export default function Banks() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedBank, setSelectedBank] = React.useState<Bank | null>(null);

  const { data: banks, isLoading } = useQuery('banks', getBanks);

  const createMutation = useMutation(createBank, {
    onSuccess: () => {
      queryClient.invalidateQueries('banks');
      toast.success('Banque créée avec succès');
      setIsModalOpen(false);
    },
    onError: () => toast.error('Erreur lors de la création de la banque'),
  });

  const updateMutation = useMutation(
    (bank: Bank) => updateBank(bank.reference, bank),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('banks');
        toast.success('Banque mise à jour avec succès');
        setIsModalOpen(false);
      },
      onError: () => toast.error('Erreur lors de la mise à jour de la banque'),
    }
  );

  const deleteMutation = useMutation(deleteBank, {
    onSuccess: () => {
      queryClient.invalidateQueries('banks');
      toast.success('Banque supprimée avec succès');
    },
    onError: () => toast.error('Erreur lors de la suppression de la banque'),
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Banques</h1>
        <button
          onClick={() => {
            setSelectedBank(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Banque
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
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                N° de Compte
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solde
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {/* {
            isLoading ? <div>Chargement...</div> : */}
          <tbody className="bg-white divide-y divide-gray-200">
            {banks?.map((bank) => (
              <tr key={bank._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bank.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bank.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bank.agence}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bank.contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bank.numero_de_compte}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bank.realtime_solde.toLocaleString()} XAF
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedBank(bank);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Êtes-vous sûr de vouloir supprimer cette banque ?')) {
                        deleteMutation.mutate(bank.reference);
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
            {/* } */}
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">
              {selectedBank ? 'Modifier la Banque' : 'Nouvelle Banque'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const bankData = {
                  reference: formData.get('reference') as string,
                  nom: formData.get('nom') as string,
                  agence: formData.get('agence') as string,
                  contact: formData.get('contact') as string,
                  numero_de_compte: formData.get('numero_de_compte') as string,
                  realtime_solde: Number(formData.get('realtime_solde')),
                };

                if (selectedBank) {
                  updateMutation.mutate({ ...selectedBank, ...bankData });
                } else {
                  createMutation.mutate(bankData);
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
                    defaultValue={selectedBank?.reference}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    defaultValue={selectedBank?.nom}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Agence
                  </label>
                  <input
                    type="text"
                    name="agence"
                    defaultValue={selectedBank?.agence}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact
                  </label>
                  <input
                    type="text"
                    name="contact"
                    defaultValue={selectedBank?.contact}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    N° de Compte
                  </label>
                  <input
                    type="text"
                    name="numero_de_compte"
                    defaultValue={selectedBank?.numero_de_compte}
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
                    defaultValue={selectedBank?.realtime_solde}
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
                  {selectedBank ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}