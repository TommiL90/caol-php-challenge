'use server'

import {
  ClientWithNetRevenue,
  MonthWithClients,
} from './reorder-invoices-by-month-clients'

export const findAllClients = async (
  data: MonthWithClients[],
): Promise<ClientWithNetRevenue[]> => {
  const result = data.reduce((clients, mesCliente) => {
    mesCliente.clientes.forEach((cliente) => {
      if (!clients.find((c) => c.co_cliente === cliente.co_cliente)) {
        clients.push(cliente)
      }
    })
    return clients
  }, [] as ClientWithNetRevenue[])

  return result
}
