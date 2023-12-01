import { UserData } from "./userData"

export interface InvoicesByUserAndMonth {
  [user: string]: {
    [month: string]: UserData
  }
}