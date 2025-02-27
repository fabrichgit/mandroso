import { create } from 'zustand';
import { Client, ClientFormData } from '../types/client';

interface ClientStore {
  clients: Client[];
  editingClient: Client | null;
  addClient: (clientData: ClientFormData) => Client;
  editClient: (clientData: ClientFormData) => void;
  deleteClient: (id: string) => void;
  setEditingClient: (client: Client | null) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
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
}));