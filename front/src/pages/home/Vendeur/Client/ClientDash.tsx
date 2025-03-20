import { Users } from 'lucide-react';
import { ClientForm } from '../../../../components/Client/ClientForm';
import { ClientList } from '../../../../components/Client/ClientList';
import { ClientModal } from '../../../../components/Client/ClientModal';
import { useClientStore } from '../../../../store/useClientStore';
import { useEffect } from 'react';
import { useClients } from '../../../../hook/data';
import axios from 'axios';
import { api, token } from '../../../../constant';
import { ClientFormData } from '../../../../types/client';

function ClientDash() {
  const {data, reFetch} = useClients()
  const { clients, setClients, editingClient, setEditingClient } = useClientStore();

  useEffect(() => {
    setClients(data)
  }, [data])

  const create = async (data: ClientFormData) =>{
    await axios.post(api()+"/clients/", data, {
      headers: {
        Authorization: token()
      }
    })
    .then(reFetch)
    .catch(() => alert("something wrong !"))
  }

  const update = async (data: Partial<ClientFormData>) =>{
    await axios.put(api()+"/clients/"+editingClient?._id, data, {
      headers: {
        Authorization: token()
      }
    })
    .then(reFetch)
    .catch(() => alert("something wrong !"))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Users className="h-50 w-5 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Gestion des Clients
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Total clients: {clients?.length}
            </div>
          </div>

          <div className="space-y-8">
            <ClientForm
              onSubmit={create}
              isEditing={false}
            />

            <ClientList
              clients={clients}
              onEdit={setEditingClient}
              onDelete={useClientStore.getState().deleteClient}
            />
          </div>
        </div>
      </div>

      {editingClient && (
        <ClientModal
          isOpen={!!editingClient}
          onClose={() => setEditingClient(null)}
          client={editingClient}
          onSubmit={update}
        />
      )}
    </div>
  );
}

export default ClientDash;