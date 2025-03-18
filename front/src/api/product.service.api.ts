import axios from 'axios';
import { api } from '../constant';

const API_URL = api()+"/products"

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
}

export class ProductsService {
  async getAll(): Promise<Product[]> {
    const response = await axios.get<Product[]>(API_URL+'/');
    return response.data;
  }

  async getById(id: string): Promise<Product> {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
  }

  async create(product: Product): Promise<Product> {
    const response = await axios.post<Product>(API_URL+'/', product);
    return response.data;
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const response = await axios.put<Product>(`${API_URL}/${id}`, product);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }
}

export default new ProductsService();
