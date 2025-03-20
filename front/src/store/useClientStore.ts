import { create } from 'zustand';
import { Client, ClientFormData } from '../types/client';

interface ClientStore {
  clients: Client[];
  setClients: (clients: Client[]) => void;
  editingClient: Client | null;
  addClient: (clientData: ClientFormData) => Client;
  editClient: (clientData: ClientFormData) => void;
  deleteClient: (id: string) => void;
  setEditingClient: (client: Client | null) => void;
  getById: (id: string) => Client | undefined;
}

export const useClientStore = create<ClientStore>((set, prev) => ({
  clients: [],
  editingClient: null,
  addClient: (clientData) => {
    const newClient: Client = {
      ...clientData,
      _id: crypto.randomUUID(),
    };
    set((state) => ({ clients: [...state.clients, newClient] }));
    return newClient
  },
  // ts-ignore
  editClient: (clientData) => {
    // ts-ignore
    set((state) => {
      // ts-ignore
      if (!state.editingClient) return state;
      return {
        clients: state.clients.map((client) =>
          client._id === state.editingClient?._id
            ? { ...clientData, id: client._id }
            : client
        ),
        editingClient: null,
      };
    });
  },
  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter((client) => client._id !== id),
    }));
  },
  setEditingClient: (client) => {
    set({ editingClient: client });
  },
  getById(id) {
    return prev().clients.find(c => c._id === id)
  },
  setClients(clients) {
    set({ clients });
  },
}));