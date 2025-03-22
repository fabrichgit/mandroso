import axios from 'axios';
import { Bank, Caisse, CoffreFort, MobileBanking, Transaction, TransactionSaved } from '../types';
import { api as ap, token } from '../../../../../../constant';

const api = axios.create({
  baseURL: ap(),
});

// Banks
export const getBanks = () => api.get<Bank[]>('/banks/', {headers: {Authorization: token()}}).then(res => res.data);
export const getBank = (reference: string) => api.get<Bank>(`/banks/${reference}`, {headers: {Authorization: token()}}).then(res => res.data);
export const createBank = (bank: Omit<Bank, '_id'>) => api.post('/banks/', bank, {headers: {Authorization: token()}}).then(res => res.data);
export const updateBank = (reference: string, bank: Omit<Bank, '_id'>) => api.put(`/banks/${reference}`, bank, {headers: {Authorization: token()}}).then(res => res.data);
export const deleteBank = (reference: string) => api.delete(`/banks/${reference}`, {headers: {Authorization: token()}}).then(res => res.data);

// Caisses
export const getCaisses = () => api.get<Caisse[]>('/caisses/', {headers: {Authorization: token()}}).then(res => res.data);
export const getCaisse = (reference: string) => api.get<Caisse>(`/caisses/${reference}`, {headers: {Authorization: token()}}).then(res => res.data);
export const createCaisse = (caisse: Omit<Caisse, '_id'>) => api.post('/caisses/', caisse, {headers: {Authorization: token()}}).then(res => res.data);
export const updateCaisse = (reference: string, caisse: Omit<Caisse, '_id'>) => api.put(`/caisses/${reference}`, caisse, {headers: {Authorization: token()}}).then(res => res.data);
export const deleteCaisse = (reference: string) => api.delete(`/caisses/${reference}`, {headers: {Authorization: token()}}).then(res => res.data);

// Coffre-forts
export const getCoffreForts = () => api.get<CoffreFort[]>('/coffreforts/', {headers: {Authorization: token()}}).then(res => res.data);
export const getCoffreFort = (reference: string) => api.get<CoffreFort>(`/coffreforts/${reference}`, {headers: {Authorization: token()}}).then(res => res.data);
export const createCoffreFort = (coffreFort: Omit<CoffreFort, '_id'>) => api.post('/coffreforts/', coffreFort, {headers: {Authorization: token()}}).then(res => res.data);
export const updateCoffreFort = (reference: string, coffreFort: Omit<CoffreFort, '_id'>) => api.put(`/coffreforts/${reference}`, coffreFort, {headers: {Authorization: token()}}).then(res => res.data);
export const deleteCoffreFort = (reference: string) => api.delete(`/coffreforts/${reference}`, {headers: {Authorization: token()}}).then(res => res.data);

// Mobile Banking
export const getMobileBankings = () => api.get<MobileBanking[]>('/mobilebankings/', {headers: {Authorization: token()}}).then(res => res.data);
export const getMobileBanking = (reference: string) => api.get<MobileBanking>(`/mobilebankings/${reference}`, {headers: {Authorization: token()}}).then(res => res.data);
export const createMobileBanking = (mobileBanking: Omit<MobileBanking, '_id'>) => api.post('/mobilebankings/', mobileBanking, {headers: {Authorization: token()}}).then(res => res.data);
export const updateMobileBanking = (reference: string, mobileBanking: Omit<MobileBanking, '_id'>) => api.put(`/mobilebankings/${reference}`, mobileBanking, {headers: {Authorization: token()}}).then(res => res.data);
export const deleteMobileBanking = (reference: string) => api.delete(`/mobilebankings/${reference}`, {headers: {Authorization: token()}}).then(res => res.data);

// Transactions
export const getTransactions = () => api.get<Transaction[]>('/transactions/', {headers: {Authorization: token()}}).then(res => res.data);
export const getTransaction = (id: string) => api.get<Transaction>(`/transactions/${id}`, {headers: {Authorization: token()}}).then(res => res.data);
export const createTransaction = (transaction: TransactionSaved) => api.post('/transactions/', transaction, {headers: {Authorization: token()}}).then(res => res.data);
export const updateTransaction = (id: string, transaction: TransactionSaved) => api.put(`/transactions/${id}`, transaction, {headers: {Authorization: token()}}).then(res => res.data);
export const deleteTransaction = (id: string) => api.delete(`/transactions/${id}`, {headers: {Authorization: token()}}).then(res => res.data);