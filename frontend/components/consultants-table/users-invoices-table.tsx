'use client'
import React, { useContext } from 'react'
import TableRoot from './table-root'
import { UserInvoices } from '@/types/userInvoices'
import TableHeader from './table-header'
import { getMonthNameWithYear } from '@/functions/get-month-name-with-year'
import { TableBody, TableRow, TableCell, TableHead } from '../ui/table'
import { calculateNetValueAndCommissionOfMOnth } from '@/functions/calculate-netvalue-and-commission-month'
import { FinancialContext } from '@/contexts/financial-context'
import Decimal from 'decimal.js-light'
import { formatNumberAsCurrency } from '@/lib/formatCurrencyValue'

interface UserInvoicesTableProps {
  user: string
  userInvoices: UserInvoices
}

const UserInvoicesTable = ({ user, userInvoices }: UserInvoicesTableProps) => {
  const { fixedCostfromConsultantData } = useContext(FinancialContext)
  const { netValueMonths, totalCommissionMonths } =
    calculateNetValueAndCommissionOfMOnth(userInvoices)

  const fixedCost = fixedCostfromConsultantData.find(
    (e) => e.co_usuario === user,
  )

  const entries = new Decimal(Object.keys(userInvoices).length)
  const fixedCostMonth = new Decimal(fixedCost?.brut_salario || 0).times(
    entries,
  )

  const monthlyProfit = new Decimal(netValueMonths)
    .minus(new Decimal(totalCommissionMonths))
    .minus(fixedCostMonth)
    .toNumber()

  return (
    <TableRoot user={user}>
      <TableHeader />
      <TableBody>
        {Object.entries(userInvoices).map(([month, userData], index) => {
          const profit = new Decimal(userData.totalNetValue)
            .minus(new Decimal(userData.totalCommission))
            .toNumber()
          const { monthName, yearNumeric } = getMonthNameWithYear(month)

          return (
            <TableRow key={index}>
              <TableCell>{`${monthName} de ${yearNumeric}`}</TableCell>
              <TableCell>
                {/* Receita Líquida de usuario */}
                {formatNumberAsCurrency(userData.totalNetValue)}
              </TableCell>
              {/* Custo Fixo de usuario */}
              <TableCell>
                {formatNumberAsCurrency(-(fixedCost?.brut_salario ?? 0), {
                  signDisplay: 'always',
                })}
              </TableCell>
              {/* Comisao de usuario */}
              <TableCell>
                {formatNumberAsCurrency(-userData.totalCommission, {
                  signDisplay: 'always',
                })}
              </TableCell>
              <TableCell className={profit > 0 ? '' : 'text-destructive'}>
                {/* Lucro de usuario */}
                {formatNumberAsCurrency(profit)}
              </TableCell>
            </TableRow>
          )
        })}
        <TableRow>
          <TableHead>SALDO</TableHead>
          <TableHead>{formatNumberAsCurrency(netValueMonths)}</TableHead>
          <TableHead>
            {formatNumberAsCurrency(-fixedCostMonth, {
              signDisplay: 'always',
            })}
          </TableHead>
          <TableHead>
            {' '}
            {formatNumberAsCurrency(-totalCommissionMonths, {
              signDisplay: 'always',
            })}
          </TableHead>
          <TableHead
            className={
              monthlyProfit > 0 ? 'text-green-700' : 'text-destructive'
            }
          >
            {formatNumberAsCurrency(monthlyProfit)}
          </TableHead>
        </TableRow>
      </TableBody>
    </TableRoot>
  )
}

export default UserInvoicesTable
