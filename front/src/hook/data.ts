import { create } from "zustand"
import useFetch from "http-react"
import { api, token } from "../constant"
import { Category } from "../types/category"
import { Client } from "../types/client"

export function useData_operations() {

    return [{
        id: 'djash',
        label: 'operation 1'
    }, {
        id: 'asdk',
        label: 'operation 2'
    }, {
        id: 'aksljk',
        label: 'operation 3'
    }, {
        id: 'hfk',
        label: 'operation 4'
    }, {
        id: 'kjdhfs',
        label: 'operation 5'
    }, {
        id: 'kbakn',
        label: 'operation 6'
    }, {
        id: 'kjslk',
        label: 'operation 7'
    }, {
        id: 'JKLSD',
        label: 'operation 8'
    }]
}

const default_ = [{
    id: 'Gerant',
    label: 'Gerant',
    operations: []
}, {
    id: 'Magasinier',
    label: 'Magasinier',
    operations: []
}, {
    id: 'Vendeur',
    label: 'Vendeur',
    operations: []
}, {
    id: 'Caissier',
    label: 'Caissier',
    operations: []
}]

export const useData_roles = create<{data: {id:string, label: string, operations: {id:string, label: string}[]}[], add: (new_: {id:string, label: string, operations: {id:string, label: string}[]}) => void}>(set => ({
    data: default_,
    add(new_) {
        set(prv => ({...prv, data: [...prv.data, new_]}))
    },
}))

export const useCategory = () => useFetch<Category[]>(api()+'/products/categories', {
    headers: {
        "Authorization": `Bearer ${token()}`
    }
})



export const useClients = () => useFetch<Client[]>(api()+'/clients', {
    headers: {
        "Authorization": `Bearer ${token()}`
    }
})