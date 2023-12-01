'use server'
import Decimal from 'decimal.js-light'
import { OutputItem } from './transform-invoices-to-monthly-format'
import { UserSummaries } from './user-summaries'

export const transformToClientSummaries = async (
  data: OutputItem[],
): Promise<UserSummaries[]> => {
  const clientSumMap: Record<string, Decimal> = {}

  data.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (key !== 'date') {
        const cliente = key

        const decimalValue = new Decimal(value)

        clientSumMap[cliente] = (clientSumMap[cliente] || new Decimal(0)).plus(
          decimalValue,
        )
      }
    })
  })

  const clientSummaries: UserSummaries[] = Object.entries(clientSumMap)
    .filter(([_, value]) => !value.isZero())
    .map(([cliente, value]) => ({
      name: cliente,
      value: value.toNumber(),
    }))

  return clientSummaries
}
