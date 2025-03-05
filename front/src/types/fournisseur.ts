export interface Vendeurs {
    id?: string;
    nom: string;
    telephone: string;
    aPropos: string;
}

export interface Fournisseur {
    id?: string,
    nom: string,
    telephone: string,
    adresse: string,
    compte: string,
    nif: string,
    stat: string,
    credit: string,
    livraison: string,
    vendeurs?: Vendeurs[],
}

export type FournisseurFormData = Omit<Fournisseur, 'id'>;