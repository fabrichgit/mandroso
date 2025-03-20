export const api = () => localStorage.getItem('api') || "https://api-mandroso.onirtech.com"
export const token = () => `${localStorage.getItem('token')}`