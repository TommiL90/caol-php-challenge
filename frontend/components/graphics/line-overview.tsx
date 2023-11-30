'use client'

import { COLORS } from '@/constants/colors'
import { ClientsContext } from '@/contexts/client-context'
import { useContext } from 'react'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from 'recharts'

export function LineOverview() {
  const { reportGraphic, movedUsers } = useContext(ClientsContext)

  const result = reportGraphic.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newItem: { [key: string]: any } = { date: item.date }
    for (const key in item) {
      if (key !== 'date') {
        const coCliente = parseInt(key)
        const matchingClient = movedUsers.find(
          (client) => client.co_cliente === coCliente,
        )
        if (matchingClient) {
          newItem[matchingClient.no_fantasia || key] = item[key]
        }
      }
    }
    return newItem
  })

  const keysSet = new Set<string>()

  result.forEach((item) => {
    for (const key in item) {
      if (key !== 'date') {
        keysSet.add(key)
      }
    }
  })

  const keysArray = Array.from(keysSet)

  return (
    <>
      {result.length > 0 && (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={result}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 32000]}
              tickFormatter={(value) => `$${value}`}
            />{' '}
            <Tooltip />
            <Legend />
            {keysArray.map((user, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={user}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  )
}
