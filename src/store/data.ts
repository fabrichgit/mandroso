import { create } from "zustand";
import { User } from "../api/auth";

export const useStore_Users = create<User[]>(_ => JSON.parse(localStorage.getItem('users') || "[]"))