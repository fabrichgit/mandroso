import { create } from "zustand";
import { User } from "../api/auth";

export const useStore_Users = create<{data: User[], reFetch: () => void}>(set => ({
    data: JSON.parse(localStorage.getItem('users') || "[]"),
    reFetch() {
        set({data: JSON.parse(localStorage.getItem('users') || "[]")})
    },
}))