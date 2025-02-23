export interface Client {
    id: string;
    name: string;
    contact: string;
    nif: string;
    stat: string;
}

export type ClientFormData = Omit<Client, 'id'>;