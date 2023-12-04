'use client'

import { COLORS } from '@/constants/colors'
import { FinancialContext } from '@/contexts/financial-context'
import { useContext } from 'react'
import {
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from 'recharts'

export function BarOverview() {
  const { reportGraphic, userArr } = useContext(FinancialContext)
  const keyExists =
    reportGraphic.length > 0 && 'averageFixedCost' in reportGraphic[0]

  return (
    <>
      {reportGraphic.length > 0 && (
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={reportGraphic}>
            <XAxis
              dataKey="month"
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
            />
            <Tooltip />
            <Legend />
            {userArr.map((user, index) => (
              <Bar
                key={index}
                dataKey={user}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            {keyExists && (
              <Line
                type="monotone"
                dataKey="averageFixedCost"
                stroke="#adfa1d"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </>
  )
}
