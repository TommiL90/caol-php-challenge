'use server'
import { UserData } from '@/types/userData'
import { RetrieveInvoice } from './retrieve-invoices'
import { OS } from './retrieve-os-by-user'
import Decimal from 'decimal.js-light'

export const orderInvoicesByUserAndMonth = async (
  osByUsers: OS[],
  invoices: RetrieveInvoice[],
) => {
  const invoicesByUserAndMonth = osByUsers.reduce(
    (accumulator: { [key: string]: any }, os) => {
      const user = os.co_usuario

      if (user !== null && user !== undefined) {
        if (!accumulator[user]) {
          accumulator[user] = {}
        }

        for (const invoice of invoices) {
          if (invoice.co_os === os.co_os) {
            const invoiceDate = new Date(invoice.data_emissao)
            const monthKey = `${invoiceDate.getFullYear()}-${
              invoiceDate.getMonth() + 1
            }`

            if (!accumulator[user][monthKey]) {
              accumulator[user][monthKey] = {
                invoices: [],
                totalNetValue: 0,
                totalCommission: 0,
              }
            }

            const value = new Decimal(invoice.valor)
            const totalImpInc = value.mul(
              new Decimal(invoice.total_imp_inc).div(100),
            )
            const netValue = value.minus(totalImpInc)
            const porcentualCommission = new Decimal(invoice.comissao_cn).div(
              100,
            )
            const commission = porcentualCommission.mul(netValue)

            const formattedInvoice = {
              ...invoice,
              receita_liquida: netValue.toNumber(),
              comissao: commission.toNumber(),
            }

            accumulator[user][monthKey].invoices.push(formattedInvoice)
            accumulator[user][monthKey].totalNetValue += netValue.toNumber()
            accumulator[user][monthKey].totalCommission += commission.toNumber()
          }
        }
      }

      return accumulator
    },
    {},
  )

  return invoicesByUserAndMonth
}

export interface InvoicesByUserAndMonth {
  [user: string]: {
    [month: string]: UserData
  }
}
