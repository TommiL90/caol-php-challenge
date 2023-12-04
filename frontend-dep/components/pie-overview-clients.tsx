'use client'
import React, { useContext } from 'react'
import { PieOverview } from './graphics/pie-overview'
import { ClientsContext } from '@/contexts/client-context'

const PieOverviewClients = () => {
  const { reportPizza, movedUsers } = useContext(ClientsContext)

  const newArr = reportPizza.map((pair) => {
    const matchingClient = movedUsers.find(
      (client) => client.co_cliente.toString() === pair.name,
    )
    if (matchingClient && matchingClient.no_fantasia) {
      return { name: matchingClient.no_fantasia, value: pair.value }
    } else {
      return pair
    }
  })

  return <>{newArr.length > 0 && <PieOverview reportPizza={newArr} />}</>
}

export default PieOverviewClients
