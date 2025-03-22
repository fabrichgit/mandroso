import React from 'react';
import { Role } from '../types';
import { useStore } from '../store/useStore';

interface RoleFormProps {
  initialData?: Role;
}

const initialRoleState: Role = {
  roleName: '',
  roleDescription: ''
};

export const RoleForm: React.FC<RoleFormProps> = ({ initialData = initialRoleState }) => {
  const { createRole, updateRole, setIsRoleModalOpen } = useStore();
  const [formData, setFormData] = React.useState<Role>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData.roleName) {
      await updateRole(formData);
    } else {
      await createRole(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom du rôle</label>
        <input
          type="text"
          value={formData.roleName}
          onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={formData.roleDescription}
          onChange={(e) => setFormData({ ...formData, roleDescription: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setIsRoleModalOpen(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          {initialData.roleName ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};