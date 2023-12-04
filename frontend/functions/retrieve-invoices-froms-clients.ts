'use server'
import { prisma } from '@/lib/prisma'
import { Client } from '@/types/clients'

export const retrieveInvoicesFromClients = async (
  clients: Client[],
  startDate: Date,
  endDate: Date,
) => {
  const invoices = await prisma.cao_fatura.findMany({
    where: {
      co_cliente: { in: clients.map((e) => e.co_cliente) },
      data_emissao: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
  })
  return invoices
}
