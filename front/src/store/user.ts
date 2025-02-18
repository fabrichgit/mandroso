import { create } from 'zustand'
import { auth, User } from '../api/auth'

export const user_store = create<{ data: User | null, update: (new_: any) => void, reFetch: () => void}>(set => ({
    data: null,
    update(new_) {
        set((_prev) => ({ data: new_ }))
    },
    reFetch() {
        auth()
        .then((new_) => {
            set((_prev) => ({ data: new_ }))
        })
    },
}))