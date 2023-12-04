import { Invoice } from './invoice'

export interface UserData {
  invoices: Invoice[]
  totalNetValue: number
  totalCommission: number
}
