/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { ClientsContext } from '@/contexts/client-context'
import { useContext } from 'react'
import {
  TableHeader,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
} from '../ui/table'
import { MonthWithClients } from '@/functions/reorder-invoices-by-month-clients'
import { MONTHS } from '@/constants/months'
import Decimal from 'decimal.js-light'
import { formatNumberAsCurrency } from '@/lib/formatCurrencyValue'

const TabletClients = () => {
  const { allClientForTable, arrOrderesForMonthAndUser, movedUsers } =
    useContext(ClientsContext)

  const getTotalByClient = (clientId: number, data: MonthWithClients[]) => {
    let total = new Decimal(0)
    data.forEach((mesCliente) => {
      const clientData = mesCliente.clientes.find(
        (c) => c.co_cliente === clientId,
      )
      if (clientData) {
        total = total.plus(new Decimal(clientData.receita_liquida_do_mes))
      }
    })

    return formatNumberAsCurrency(total.toNumber())
  }

  return (
    <>
      {allClientForTable && arrOrderesForMonthAndUser && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Periodo</TableHead>
              {allClientForTable.map((cliente) => (
                <TableHead key={cliente.co_cliente}>
                  {
                    movedUsers.find((u) => u.co_cliente === cliente.co_cliente)
                      ?.no_fantasia
                  }
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrOrderesForMonthAndUser.map((mesCliente) => (
              <TableRow key={`unique_key_${Math.random()}`}>
                <TableCell>{`${MONTHS[mesCliente.mes]} de ${
                  mesCliente.ano
                }`}</TableCell>
                {allClientForTable.map((cliente) => (
                  <TableCell key={cliente.co_cliente}>
                    {(() => {
                      const clienteExistente = mesCliente.clientes.find(
                        (c) => c.co_cliente === cliente.co_cliente,
                      )
                      if (
                        clienteExistente &&
                        clienteExistente.receita_liquida_do_mes !== undefined
                      ) {
                        return formatNumberAsCurrency(
                          +clienteExistente.receita_liquida_do_mes,
                        )
                      } else {
                        return formatNumberAsCurrency(0)
                      }
                    })()}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell>TOTAL</TableCell>
              {allClientForTable.map((cliente) => (
                <TableCell key={cliente.co_cliente}>
                  {getTotalByClient(
                    cliente.co_cliente,
                    arrOrderesForMonthAndUser,
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default TabletClients
