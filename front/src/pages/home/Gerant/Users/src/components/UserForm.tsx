import React from 'react';
import { User } from '../types';
import { useStore } from '../store/useStore';

interface UserFormProps {
  initialData?: User;
}

const initialUserState: User = {
  name: '',
  first_name: '',
  adresse: '',
  career: '',
  contacts: [],
  role_id: '',
  startlogintime: '',
  stoplogintime: ''
};

export const UserForm: React.FC<UserFormProps> = ({ initialData = initialUserState }) => {
  const { roles, createUser, updateUser, setIsModalOpen } = useStore();
  const [formData, setFormData] = React.useState<User>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData.id) {
      await updateUser({ ...formData, id: initialData.id });
    } else {
      await createUser(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse</label>
        <input
          type="text"
          value={formData.adresse}
          onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Carrière</label>
        <input
          type="text"
          value={formData.career}
          onChange={(e) => setFormData({ ...formData, career: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rôle</label>
        <select
          value={formData.role_id}
          onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Sélectionner un rôle</option>
          {roles.map((role) => (
            <option key={role.roleName} value={role.roleName}>
              {role.roleDescription}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          {initialData.id ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};