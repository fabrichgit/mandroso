import { create } from "zustand";

export const useLocalStore = create<{local: string[], add: (new_: string) => void, remove: (index: number) => void}>(set => ({
    local: [],
    add(new_) {
        set(prev => ({...prev, local: [new_, ...prev.local]}))
    },
    remove(index) {
        set(prev => ({
            ...prev,
            local: prev.local?.filter((_, i) => i !== index)
        }));
    },
}))