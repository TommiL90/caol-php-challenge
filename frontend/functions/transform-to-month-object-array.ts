/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import Decimal from 'decimal.js-light'
import { getMonthName } from './get-month-name'
import { api } from '@/services/api'
import { InvoicesByUserAndMonth } from '@/types/invoices-by-user-and-month'

export interface MonthObject {
  month: string
  averageFixedCost: number
}

export type MonthObjectArray = MonthObject & Record<string, number | undefined>

export const transformMonthObjectToArray = async (
  invoicesByUserAndMonth: InvoicesByUserAndMonth,
): Promise<MonthObjectArray[]> => {
  const newArr: MonthObjectArray[] = []

  let avgFixedCost: number

  try {

    const response = await api("average-fixed-cost")

    avgFixedCost = response.data
    
  } catch (error) {
    console.log(error)
  }

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
