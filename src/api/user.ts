import axios from "axios";
import { api, token } from "../constant";
import { User } from "./auth";
import { LowercaseKeys } from "../types/generic";

export async function createUser(data: {name: string, email: string, role: string, password: string}) {
    const res = await axios.post(`${api()}/user/register`, data, {
        headers: {
            "Authorization": token()
        }
    })

    return res.data
}

export async function deleteUser(id: string) {
    const res = await axios.delete(`${api()}/user/`, {
        headers: {
            "Authorization": token()
        },
        params: {
            id
        }
    })

    return res.data
}

export async function updatePass(data: {password: string}) {
    const res = await axios.post(`${api()}/user/reset_password`, data, {
        headers: {
            "Authorization": token()
        }
    })

    return res.data
}

export async function updateAvatar(data: {avatar: string}) {
    const res = await axios.post(`${api()}/user/avatar`, data, {
        headers: {
            "Authorization": token()
        }
    })

    return res.data
}

export async function askResetLink() {
    const res = await axios.get(`${api()}/user/reset`, {
        headers: {
            "Authorization": token()
        }
    })

    return res.data
}

export async function updateStatus(id: string, available: boolean) {
    const res = await axios.post(`${api()}/user/status`, {available}, {
        headers: {
            "Authorization": token()
        },
        params: {
            id
        }
    })

    return res.data
}

export async function updateUser({data}: {data: Partial<LowercaseKeys<User>>}, id: string | undefined) {
    console.log(data);
    
    const res = await axios.post(`${api()}/user/byadmin`, data, {
        headers: {
            "Authorization": token()
        },
        params: {
            id
        }
    })

    return res.data
}