import axios, { AxiosResponse } from "axios";
import { api } from "../constant";
import { Category } from "../types/category";
import { Product } from "../types/product";

const API_BASE_URL = api(); // Remplace avec ton URL d'API


class ApiService {
    // Récupérer toutes les catégories
    static async getCategories(): Promise<Category[]> {
        try {
            const response: AxiosResponse<Category[]> = await axios.get(
                `${API_BASE_URL}/categories`
            );
            return response.data;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des catégories");
        }
    }

    // Ajouter une nouvelle catégorie
    static async createCategory(category: Partial<Category>): Promise<void> {
        try {
            await axios.post(`${API_BASE_URL}/categories`, category);
        } catch (error) {
            throw new Error("Erreur lors de la création de la catégorie");
        }
    }

    // Récupérer une catégorie par ID
    static async getCategoryById(id: string): Promise<Category> {
        try {
            const response: AxiosResponse<Category> = await axios.get(
                `${API_BASE_URL}/categories/${id}`
            );
            return response.data;
        } catch (error) {
            throw new Error("Erreur lors de la récupération de la catégorie");
        }
    }

    // Mettre à jour une catégorie
    static async updateCategory(id: string, category: Partial<Category>): Promise<void> {
        try {
            await axios.put(`${API_BASE_URL}/categories/${id}`, category);
        } catch (error) {
            throw new Error("Erreur lors de la mise à jour de la catégorie");
        }
    }

    // Supprimer une catégorie
    static async deleteCategory(id: string): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/categories/${id}`);
        } catch (error) {
            throw new Error("Erreur lors de la suppression de la catégorie");
        }
    }

    // Récupérer tous les produits
    static async getProducts(): Promise<Product[]> {
        try {
            const response: AxiosResponse<Product[]> = await axios.get(
                `${API_BASE_URL}/products`
            );
            return response.data;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des produits");
        }
    }

    // Ajouter un produit
    static async createProduct(product: Partial<Product>): Promise<void> {
        try {
            await axios.post(`${API_BASE_URL}/products`, product);
        } catch (error) {
            throw new Error("Erreur lors de la création du produit");
        }
    }

    // Récupérer un produit par ID
    static async getProductById(id: string): Promise<Product> {
        try {
            const response: AxiosResponse<Product> = await axios.get(
                `${API_BASE_URL}/products/${id}`
            );
            return response.data;
        } catch (error) {
            throw new Error("Erreur lors de la récupération du produit");
        }
    }

    // Mettre à jour un produit
    static async updateProduct(id: string, product: Partial<Product>): Promise<void> {
        try {
            await axios.put(`${API_BASE_URL}/products/${id}`, product);
        } catch (error) {
            throw new Error("Erreur lors de la mise à jour du produit");
        }
    }

    // Supprimer un produit
    static async deleteProduct(id: string): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/products/${id}`);
        } catch (error) {
            throw new Error("Erreur lors de la suppression du produit");
        }
    }
}

export default ApiService;
