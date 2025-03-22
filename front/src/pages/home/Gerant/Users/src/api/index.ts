import { token, api as url } from './../../../../../../constant/index';
import axios from 'axios';
import { User, Role, AuthData, UserLogin } from '../types';

const API_URL = url(); // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': token(),
  }
});

export const login = async (data: AuthData) => {
  const response = await api.post('/user/auth', data);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/user/all');
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await api.post('/user/', user);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await api.put('/user/', user);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/${id}`);
  return response.data;
};

export const getRoles = async () => {
  const response = await api.get('/user/roles');
  return response.data;
};

export const createRole = async (role: Role) => {
  const response = await api.post('/user/role', role);
  return response.data;
};

export const createUserLogin = async (userLogin: UserLogin) => {
  const response = await api.post('/user/createlogin', userLogin);
  return response.data;
};