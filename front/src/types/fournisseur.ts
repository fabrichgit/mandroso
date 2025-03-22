export interface Vendeurs {
    _id?: string,
    description: string,
    name: string,
    phone: string,
    provider_id?: string
  }

export interface Fournisseur {
    _id?: string,
    account: string,
    address: string,
    contact: string[],
    creditDuration: string,
    deliveryMeanTime: string,
    name: string,
    nif: string,
    phone: string,
    stat: string
}

// {
//     id?: string,
//     nom: string,
//     telephone: string,
//     adresse: string,
//     compte: string,
//     nif: string,
//     stat: string,
//     credit: string,
//     livraison: string,
//     vendeurs?: Vendeurs[],
// }

export type FournisseurFormData = Omit<Fournisseur, 'id' | '_id'>;