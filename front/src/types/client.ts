// ts-ignore
export interface Client {
    // ts-ignore
    _id?: string;
    name: string;
    contact?: string;
    nif?: string;
    stat?: string;
    type?: string
}

export type ClientFormData = Omit<Client, '_id'>;