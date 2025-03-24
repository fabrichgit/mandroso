import axios from 'axios';
import { Entrepot, Place, PlaceContent, ProductStocked } from './types';

const API_URL = 'https://api-mandroso.onirtech.com'; // Ajustez selon votre configuration

export const api = {
  // Entrepôts
  getEntrepots: () => axios.get<Entrepot[]>(`${API_URL}/entrepots/`),
  createEntrepot: (data: Omit<Entrepot, 'id'>) => axios.post(`${API_URL}/entrepots/`, data),
  updateEntrepot: (id: string, data: Entrepot) => axios.put(`${API_URL}/entrepots/${id}`, data),
  deleteEntrepot: (id: string) => axios.delete(`${API_URL}/entrepots/${id}`),

  // Places
  getPlaces: (entrepotId: string) => axios.get<Place[]>(`${API_URL}/entrepots/places/${entrepotId}`),
  getPlaceContent: (placeId: string) => axios.get<PlaceContent>(`${API_URL}/entrepots/content/${placeId}`),
  createPlace: (data: Omit<Place, 'ID'>) => axios.post(`${API_URL}/entrepots/places`, data),
  updatePlace: (id: string, data: Omit<Place, 'ID'>) => axios.put(`${API_URL}/entrepots/places/${id}`, data),
  deletePlace: (id: string) => axios.delete(`${API_URL}/entrepots/places/${id}`),

  // Produits
  createProduct: (data: Omit<ProductStocked, 'ID'>) => axios.post(`${API_URL}/entrepots/product`, data),
  updateProduct: (id: string, data: Omit<ProductStocked, 'ID'>) => axios.put(`${API_URL}/entrepots/product/${id}`, data),
  deleteProduct: (id: string) => axios.delete(`${API_URL}/entrepots/product/${id}`)
};