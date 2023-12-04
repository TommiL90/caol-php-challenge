'use client'

import UserInvoicesTable from './users-invoices-table'
import { FinancialContext } from '@/contexts/financial-context'
import { useContext } from 'react'

const ConsultantsTable = () => {
  const { reportTable } = useContext(FinancialContext)

  if (!reportTable) {
    return null
  }

  return (
    <section className="flex flex-1 flex-col gap-6">
      {Object.entries(reportTable).map(([user, userInvoices]) => (
        <UserInvoicesTable key={user} user={user} userInvoices={userInvoices} />
      ))}
    </section>
  )
}

export default ConsultantsTable
