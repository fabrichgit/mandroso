import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../api';
import { Transaction } from '../types';

export default function Transactions() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);

  const { data: transactions } = useQuery('transactions', getTransactions);

  // @ts-ignore
  const createMutation = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
      toast.success('Transaction créée avec succès');
      setIsModalOpen(false);
    },
    onError: () => toast.error('Erreur lors de la création de la transaction'),
  });

  // @ts-ignore
  const updateMutation = useMutation(
    (transaction: Transaction) => updateTransaction(transaction.id, transaction),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('transactions');
        toast.success('Transaction mise à jour avec succès');
        setIsModalOpen(false);
      },
      onError: () => toast.error('Erreur lors de la mise à jour de la transaction'),
    }
  );

  // @ts-ignore
  const deleteMutation = useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
      toast.success('Transaction supprimée avec succès');
    },
    onError: () => toast.error('Erreur lors de la suppression de la transaction'),
  });

  // if (isLoading) {
  //   return <div>Chargement...</div>;
  // }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Transactions</h1>
        <button
          onClick={() => {
            setSelectedTransaction(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Transaction
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions?.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(transaction.date), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'credit'
                        ? 'bg-green-100 text-green-800'
                        : transaction.type === 'debit'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.montant.toLocaleString()} XAF
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.source_type} - {transaction.source_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.destination_type && transaction.destination_id
                    ? `${transaction.destination_type} - ${transaction.destination_id}`
                    : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
                        deleteMutation.mutate(transaction.id);
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
              {selectedTransaction ? 'Modifier la Transaction' : 'Nouvelle Transaction'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const transactionData = {
                  date: formData.get('date') as string,
                  description: formData.get('description') as string,
                  type: formData.get('type') as 'credit' | 'debit' | 'transfert',
                  montant: Number(formData.get('montant')),
                  source_type: formData.get('source_type') as 'caisse' | 'bank' | 'mobile_banking' | 'coffre_fort',
                  source_id: formData.get('source_id') as string,
                  destination_type: formData.get('destination_type') as string,
                  destination_id: formData.get('destination_id') as string,
                };

                if (selectedTransaction) {
                  updateMutation.mutate({ ...selectedTransaction, ...transactionData });
                } else {
                  createMutation.mutate(transactionData);
                }
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    defaultValue={selectedTransaction?.date}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    defaultValue={selectedTransaction?.description}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    name="type"
                    defaultValue={selectedTransaction?.type}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="credit">Crédit</option>
                    <option value="debit">Débit</option>
                    <option value="transfert">Transfert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Montant
                  </label>
                  <input
                    type="number"
                    name="montant"
                    defaultValue={selectedTransaction?.montant}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type de Source
                  </label>
                  <select
                    name="source_type"
                    defaultValue={selectedTransaction?.source_type}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="caisse">Caisse</option>
                    <option value="bank">Banque</option>
                    <option value="mobile_banking">Mobile Banking</option>
                    <option value="coffre_fort">Coffre-fort</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID Source
                  </label>
                  <input
                    type="text"
                    name="source_id"
                    defaultValue={selectedTransaction?.source_id}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type de Destination
                  </label>
                  <select
                    name="destination_type"
                    defaultValue={selectedTransaction?.destination_type}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="caisse">Caisse</option>
                    <option value="bank">Banque</option>
                    <option value="mobile_banking">Mobile Banking</option>
                    <option value="coffre_fort">Coffre-fort</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID Destination
                  </label>
                  <input
                    type="text"
                    name="destination_id"
                    defaultValue={selectedTransaction?.destination_id}
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
                  {selectedTransaction ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}