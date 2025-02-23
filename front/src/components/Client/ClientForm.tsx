import React, { useState, useEffect } from 'react';
import { Plus, Save } from 'lucide-react';
import { Client, ClientFormData } from '../../types/client';

interface ClientFormProps {
  onSubmit: (client: ClientFormData) => void;
  initialData?: Client;
  isEditing?: boolean;
}

export function ClientForm({ onSubmit, initialData, isEditing = false }: ClientFormProps) {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    contact: '',
    nif: '',
    stat: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        contact: initialData.contact,
        nif: initialData.nif,
        stat: initialData.stat,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEditing) {
      setFormData({ name: '', contact: '', nif: '', stat: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Modifier le client' : 'Nouveau client'}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="nif" className="block text-sm font-medium text-gray-700">
            NIF
          </label>
          <input
            type="text"
            id="nif"
            name="nif"
            value={formData.nif}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="stat" className="block text-sm font-medium text-gray-700">
            STAT
          </label>
          <input
            type="text"
            id="stat"
            name="stat"
            value={formData.stat}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </>
          )}
        </button>
      </div>
    </form>
  );
}