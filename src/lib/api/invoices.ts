import api from './client';
import { Invoice } from '../../types';

export async function getInvoices(): Promise<Invoice[]> {
  const response = await api.get<Invoice[]>('/invoices');
  return response.data;
}

export async function createInvoice(invoice: Omit<Invoice, 'id'>): Promise<Invoice> {
  const response = await api.post<Invoice>('/invoices', invoice);
  return response.data;
}

export async function getInvoicePdf(id: string): Promise<Blob> {
  const response = await api.get(`/invoices/${id}/pdf`, { responseType: 'blob' });
  return response.data;
}

export async function markInvoiceAsPaid(id: string): Promise<Invoice> {
  const response = await api.post<Invoice>(`/invoices/${id}/paid`);
  return response.data;
}