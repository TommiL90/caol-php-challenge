/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import Decimal from 'decimal.js-light'
import { calculateAverageFixedCost } from './average-fixed-cost-from-consultants'
import { getMonthName } from './get-month-name'
import { InvoicesByUserAndMonth } from './order-os-by-user-and-month'

export interface MonthObject {
  month: string
  averageFixedCost: number
}

export type MonthObjectArray = MonthObject & Record<string, number | undefined>

export const transformMonthObjectToArray = async (
  invoicesByUserAndMonth: InvoicesByUserAndMonth,
): Promise<MonthObjectArray[]> => {
  const newArr: MonthObjectArray[] = []
  const avgFixedCost = await calculateAverageFixedCost()

  const months = Array.from(
    new Set(
      Object.values(invoicesByUserAndMonth).flatMap((user) =>
        Object.keys(user),
      ),
    ),
  )

  months.forEach((month) => {
    const newObj: any = {
      month: getMonthName(month),
      averageFixedCost: avgFixedCost.toFixed(2),
    }

    Object.entries(invoicesByUserAndMonth).forEach(([user, userData]) => {
      if (userData[month] && userData[month].invoices) {
        const sum = userData[month].invoices.reduce(
          (acc, invoice) => acc.plus(new Decimal(invoice.receita_liquida)),
          new Decimal(0),
        )

        newObj[user] = sum.toNumber().toFixed(2)
      } else {
        newObj[user] = '0.00'
      }
    })

    newArr.push(newObj)
  })

  return newArr
}
