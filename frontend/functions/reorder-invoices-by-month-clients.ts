/* eslint-disable camelcase */
'use server'

import { RetrieveInvoice } from '@/types/retrieve-invoices'
import Decimal from 'decimal.js-light'

export interface ClientWithNetRevenue {
  co_cliente: number
  receita_liquida_do_mes: number | Decimal
}

export interface MonthWithClients {
  mes: number
  ano: number
  clientes: ClientWithNetRevenue[]
}

export const reorderInvoicesfromMonthsAndClients = async (
  data: RetrieveInvoice[],
): Promise<MonthWithClients[]> => {
  const result: MonthWithClients[] = data.reduce(
    (acc: MonthWithClients[], invoice: RetrieveInvoice) => {
      const formatedDate = new Date(invoice.data_emissao)
      const invoiceMonth = formatedDate.getMonth()
      const invoiceYear = formatedDate.getFullYear()

      const existingMonth = acc.find(
        (item) => item.mes === invoiceMonth && item.ano === invoiceYear,
      )

      const valor = new Decimal(invoice.valor)
      const totalImpInc = new Decimal(invoice.total_imp_inc)

      const receita_liquida = valor.minus(
        totalImpInc.times(valor.dividedBy(100)),
      )

      if (existingMonth) {
        const clienteExistente = existingMonth.clientes.find(
          (cliente) => cliente.co_cliente === invoice.co_cliente,
        )

        if (
          clienteExistente &&
          typeof clienteExistente.receita_liquida_do_mes !== 'number'
        ) {
          clienteExistente.receita_liquida_do_mes =
            clienteExistente.receita_liquida_do_mes.plus(receita_liquida)
        } else {
          existingMonth.clientes.push({
            co_cliente: invoice.co_cliente,
            receita_liquida_do_mes: receita_liquida,
          })
        }
      } else {
        acc.push({
          mes: invoiceMonth,
          ano: invoiceYear,
          clientes: [
            {
              co_cliente: invoice.co_cliente,
              receita_liquida_do_mes: receita_liquida,
            },
          ],
        })
      }

      return acc
    },
    [],
  )

  // Realizamos la conversión a Number justo antes de devolver los resultados
  return result.map((month) => ({
    ...month,
    clientes: month.clientes.map((cliente) => ({
      ...cliente,
      receita_liquida_do_mes:
        typeof cliente.receita_liquida_do_mes !== 'number'
          ? cliente.receita_liquida_do_mes.toNumber()
          : cliente.receita_liquida_do_mes,
    })),
  }))
}
