'use server'
import { prisma } from '@/lib/prisma'
import { OS } from './retrieve-os-by-user'

export interface RetrieveInvoice {
  co_fatura: number
  co_cliente: number
  co_sistema: number
  co_os: number
  num_nf: number
  total: number
  valor: number
  data_emissao: Date
  corpo_nf: string
  comissao_cn: number
  total_imp_inc: number
}

export const retrieveInvoices = async (
  osByUsers: OS[], // 1
  startDate: Date,
  endDate: Date,
) => {
  const invoices = await prisma.cao_fatura.findMany({
    where: {
      co_os: { in: osByUsers.map((e) => e.co_os) },
      data_emissao: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
  })

  return invoices
}
// 2
