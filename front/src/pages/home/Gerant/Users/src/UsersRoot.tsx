import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Users, UserPlus, Trash2, Edit, Shield, Settings } from 'lucide-react';
import { useStore } from './store/useStore';
import { UserForm } from './components/UserForm';
import { RoleForm } from './components/RoleForm';
import { User, Role } from './types';

function UsersRoot() {
  const {
    roles,
    selectedUser,
    selectedRole,
    isModalOpen,
    isRoleModalOpen,
    loading,
    error,
    selectedRoleFilter,
    fetchUsers,
    fetchRoles,
    deleteUser,
    deleteRole,
    setSelectedUser,
    setSelectedRole,
    setIsModalOpen,
    setIsRoleModalOpen,
    setSelectedRoleFilter,
    filteredUsers
  } = useStore();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      await deleteUser(id);
      toast.success('Utilisateur supprimé avec succès');
    }
  };

  const handleDeleteRole = async (name: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      await deleteRole(name);
      toast.success('Rôle supprimé avec succès');
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsRoleModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Toaster position="top-right" /> */}
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md flex items-center"
              >
                <Settings className="h-5 w-5 mr-2" />
                Gérer les Rôles
              </button>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setIsModalOpen(true);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Nouvel Utilisateur
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Role Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par rôle</label>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Tous les rôles</option>
            {roles.map((role) => (
              <option key={role.roleName} value={role.roleName}>
                {role.RoleName}
              </option>
            ))}
          </select>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrière</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers().map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.first_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-gray-400 mr-2" />
                        {roles.find(r => r.roleName === user.role_id)?.roleDescription || user.role_id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.career}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => user.id && handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">
              {selectedUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
            </h2>
            <UserForm initialData={selectedUser || undefined} />
          </div>
        </div>
      )}

      {/* Role Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion des Rôles</h2>
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setIsRoleModalOpen(true);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Nouveau Rôle
              </button>
            </div>
            
            {selectedRole ? (
              <RoleForm initialData={selectedRole} />
            ) : (
              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {roles.map((role) => (
                      <tr key={role.roleName} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{role.roleName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{role.roleDescription}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleEditRole(role)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRole(role.roleName)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!selectedRole && <RoleForm />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersRoot;