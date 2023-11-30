import { UserInvoices } from '@/types/userInvoices'
import Decimal from 'decimal.js-light'

export const calculateNetValueAndCommissionOfMOnth = (
  userInvoices: UserInvoices,
) => {
  const result = Object.entries(userInvoices).reduce(
    (accumulator, [, userData]) => {
      const netValueMonths = new Decimal(userData.totalNetValue)
      const totalCommissionMonths = new Decimal(userData.totalCommission)

      accumulator.netValueMonths =
        accumulator.netValueMonths.plus(netValueMonths)
      accumulator.totalCommissionMonths =
        accumulator.totalCommissionMonths.plus(totalCommissionMonths)

      return accumulator
    },
    { netValueMonths: new Decimal(0), totalCommissionMonths: new Decimal(0) },
  )

  const netValueMonthsNumber = result.netValueMonths.toNumber()
  const totalCommissionMonthsNumber = result.totalCommissionMonths.toNumber()

  return {
    netValueMonths: netValueMonthsNumber,
    totalCommissionMonths: totalCommissionMonthsNumber,
  }
}
