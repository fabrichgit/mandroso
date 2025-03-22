import { token, api as url } from './../../../../../../constant/index';
import axios from 'axios';
import { User, Role, AuthData, UserLogin } from '../types';

const API_URL = url(); // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (data: AuthData) => {
  const response = await api.post('/user/auth', data, {
    headers: {
      'Authorization': token(),
    }
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/user/all',{
    headers: {
      'Authorization': token(),
    }
  });
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await api.get(`/user/${id}`,{
    headers: {
      'Authorization': token(),
    }
  });
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await api.post('/user/', user,{
    headers: {
      'Authorization': token(),
    }
  });
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await api.put('/user/', user, {
    headers: {
      'Authorization': token(),
    }
  });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/${id}`, {
    headers: {
      'Authorization': token(),
    }
  });
  return response.data;
};

export const getRoles = async () => {
  const response = await api.get('/user/roles', {
    headers: {
      'Authorization': token(),
    }
  });
  return response.data;
};

export const createRole = async (role: Role) => {
  const response = await api.post('/user/role', role, {
    headers: {
      'Authorization': token(),
    }
  });
  return response.data;
};

export const createUserLogin = async (userLogin: UserLogin) => {
  const response = await api.post('/user/createlogin', userLogin);
  return response.data;
};