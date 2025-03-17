import axios from "axios";
import { api, token } from "../constant";

const API_BASE_URL = api(); // Remplace par ton URL réelle
const API = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
});

// Interface pour l'authentification
export interface AuthData {
    login: string;
    password: string;
}

// Interface pour la création/mise à jour d'un utilisateur
export interface UserData {
    adresse: string;
    birthday: string;
    career: string;
    contacts: string[];
    first_name: string;
    name: string;
    role_id: string;
    startlogintime: string;
    stoplogintime: string;
}

// Interface pour la mise à jour du mot de passe
interface PasswordUpdate {
    confirmation_password: string;
    password: string;
}

// Service User
export const userService = {
    // 🔹 Authentifier un utilisateur
    authenticate: (data: AuthData) => API.post("/user/auth", data),

    // 🔹 Créer un nouvel utilisateur
    createUser: (data: UserData) => API.post("/user/", data),

    // 🔹 Modifier un utilisateur existant
    updateUser: (data: UserData) => API.put("/user", data),

    // 🔹 Obtenir un utilisateur par ID
    getUserById: (id: string) => API.get(`/user/${id}`),

    // 🔹 Supprimer un utilisateur par ID
    deleteUser: (id: string) => API.delete(`/user/${id}`),

    // 🔹 Obtenir tous les utilisateurs
    getAllUsers: () => API.get("/user/all"),

    // 🔹 Créer un login pour un utilisateur
    createUserLogin: (data: { login: string; password: string; user_id: string }) =>
        API.post("/user/createlogin", data),

    // 🔹 Mettre à jour un mot de passe
    updatePassword: (id: string, data: PasswordUpdate) =>
        API.put(`/user/updatepassword/${id}`, data),
};
