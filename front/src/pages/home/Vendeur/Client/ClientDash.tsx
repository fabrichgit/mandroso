import { Users } from 'lucide-react';
import { ClientForm } from '../../../../components/Client/ClientForm';
import { ClientList } from '../../../../components/Client/ClientList';
import { useClientStore } from '../../../../store/useClientStore';

function ClientDash() {
  const { clients, editingClient, setEditingClient } = useClientStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Gestion des Clients
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Total clients: {clients.length}
            </div>
          </div>

          <div className="space-y-8">
            <ClientForm
              onSubmit={editingClient ? useClientStore.getState().editClient : useClientStore.getState().addClient}
              initialData={editingClient || undefined}
              isEditing={!!editingClient}
            />

            <ClientList
              clients={clients}
              onEdit={setEditingClient}
              onDelete={useClientStore.getState().deleteClient}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDash;