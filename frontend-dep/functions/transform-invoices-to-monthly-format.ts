'use server'

import { MonthWithClients } from './reorder-invoices-by-month-clients'

export interface OutputItem {
  date: string
  [key: string]: number | string
}
export const transformInvoicesToMonthlyFormat = async (
  data: MonthWithClients[],
): Promise<OutputItem[]> => {
  // Obtén la lista de todos los clientes únicos presentes en todos los meses
  const allClients: Set<number> = new Set()
  data.forEach((item) => {
    item.clientes.forEach((cliente) => {
      allClients.add(cliente.co_cliente)
    })
  })

  const nuevoArr: OutputItem[] = data.map((item) => {
    const { mes, ano, clientes } = item

    const date = `${mes + 1}-${ano}`

    const newObj: OutputItem = { date }

    allClients.forEach((cliente) => {
      newObj[cliente.toString()] = '0.00'
    })

    clientes.forEach((cliente) => {
      newObj[cliente.co_cliente.toString()] = parseFloat(
        cliente.receita_liquida_do_mes.toFixed(2),
      )
    })

    return newObj
  })

  return nuevoArr
}
