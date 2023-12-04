'use server'
import { InvoicesByUserAndMonth } from '@/types/invoices-by-user-and-month'
import Decimal from 'decimal.js-light'

export interface UserSummaries {
  name: string
  value: number
}

export const calculateUserSummaries = async (
  invoicesByUserAndMonth: InvoicesByUserAndMonth,
): Promise<UserSummaries[]> => {
  const userSummaries: UserSummaries[] = []

  Object.entries(invoicesByUserAndMonth).forEach(([userName, userData]) => {
    const totalNetValueSum = Object.values(userData).reduce(
      (acc, monthData) => acc.plus(new Decimal(monthData.totalNetValue || 0)),
      new Decimal(0),
    )

    userSummaries.push({ name: userName, value: totalNetValueSum.toNumber() })
  })

  return userSummaries
}
