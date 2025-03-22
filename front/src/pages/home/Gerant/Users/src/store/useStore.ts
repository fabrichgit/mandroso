import { create } from 'zustand';
import { User, Role } from '../types';
import * as api from '../api';

interface Store {
  users: User[];
  roles: Role[];
  selectedUser: User | null;
  selectedRole: Role | null;
  isModalOpen: boolean;
  isRoleModalOpen: boolean;
  selectedRoleFilter: string;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  createUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  createRole: (role: Role) => Promise<void>;
  updateRole: (role: Role) => Promise<void>;
  deleteRole: (name: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setSelectedRole: (role: Role | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsRoleModalOpen: (isOpen: boolean) => void;
  setSelectedRoleFilter: (roleId: string) => void;
  filteredUsers: () => User[];
}

export const useStore = create<Store>((set, get) => ({
  users: [], // Initialize as empty array
  roles: [], // Initialize as empty array
  selectedUser: null,
  selectedRole: null,
  isModalOpen: false,
  isRoleModalOpen: false,
  selectedRoleFilter: '',
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await api.getUsers();
      set({ users: Array.isArray(users) ? users : [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },

  fetchRoles: async () => {
    try {
      const roles = await api.getRoles();
      set({ roles: Array.isArray(roles) ? roles : [] });
    } catch (error) {
      set({ error: 'Failed to fetch roles' });
    }
  },

  createUser: async (user: User) => {
    set({ loading: true, error: null });
    try {
      await api.createUser(user);
      get().fetchUsers();
      set({ isModalOpen: false });
    } catch (error) {
      set({ error: 'Failed to create user', loading: false });
    }
  },

  updateUser: async (user: User) => {
    set({ loading: true, error: null });
    try {
      await api.updateUser(user);
      get().fetchUsers();
      set({ isModalOpen: false, selectedUser: null });
    } catch (error) {
      set({ error: 'Failed to update user', loading: false });
    }
  },

  deleteUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await api.deleteUser(id);
      get().fetchUsers();
    } catch (error) {
      set({ error: 'Failed to delete user', loading: false });
    }
  },

  createRole: async (role: Role) => {
    set({ loading: true, error: null });
    try {
      await api.createRole(role);
      get().fetchRoles();
      set({ isRoleModalOpen: false });
    } catch (error) {
      set({ error: 'Failed to create role', loading: false });
    }
  },

  updateRole: async (role: Role) => {
    set({ loading: true, error: null });
    try {
      await api.updateRole(role);
      get().fetchRoles();
      set({ isRoleModalOpen: false, selectedRole: null });
    } catch (error) {
      set({ error: 'Failed to update role', loading: false });
    }
  },

  deleteRole: async (name: string) => {
    set({ loading: true, error: null });
    try {
      await api.deleteRole(name);
      get().fetchRoles();
    } catch (error) {
      set({ error: 'Failed to delete role', loading: false });
    }
  },

  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
  setSelectedRole: (role: Role | null) => set({ selectedRole: role }),
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  setIsRoleModalOpen: (isOpen: boolean) => set({ isRoleModalOpen: isOpen }),
  setSelectedRoleFilter: (roleId: string) => set({ selectedRoleFilter: roleId }),

  filteredUsers: () => {
    const { users, selectedRoleFilter } = get();
    if (!selectedRoleFilter) return users;
    return users.filter(user => user.role_id === selectedRoleFilter);
  }
}));