export const api = () => localStorage.getItem('api') || "http://localhost:2005"
export const token = () => `Bearer ${localStorage.getItem('token')}`