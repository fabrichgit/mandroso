export interface Bank {
  _id: string;
  reference: string;
  nom: string;
  agence: string;
  contact: string;
  numero_de_compte: string;
  realtime_solde: number;
}

export interface Caisse {
  _id: string;
  reference: string;
  user_id: string;
  realtime_solde: number;
}

export interface CoffreFort {
  _id: string;
  reference: string;
  realtime_solde: number;
}

export interface MobileBanking {
  _id: string;
  reference: string;
  numero: string;
  operateur: string;
  realtime_solde: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  montant: number;
  type: 'credit' | 'debit' | 'transfert';
  source_type: 'caisse' | 'bank' | 'mobile_banking' | 'coffre_fort';
  source_id: string;
  destination_type?: string;
  destination_id?: string;
}

export type TransactionSaved = Omit<Transaction, 'id'>;