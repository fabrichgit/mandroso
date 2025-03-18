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
      id: crypto.randomUUID(),
    };
    set((state) => ({ clients: [...state.clients, newClient] }));
    return newClient
  },
  editClient: (clientData) => {
    set((state) => {
      if (!state.editingClient) return state;
      return {
        clients: state.clients.map((client) =>
          client.id === state.editingClient?.id
            ? { ...clientData, id: client.id }
            : client
        ),
        editingClient: null,
      };
    });
  },
  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    }));
  },
  setEditingClient: (client) => {
    set({ editingClient: client });
  },
  getById(id) {
    return prev().clients.find(c => c.id === id)
  },
  setClients(clients) {
    set({ clients });
  },
}));