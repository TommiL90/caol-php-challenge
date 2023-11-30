'use client'
import { ReactNode } from 'react'
import { Table } from '@/components/ui/table'

interface TableRootProps {
  user: string
  children: ReactNode
}

const TableRoot = ({ user, children }: TableRootProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{user}</h2>
      <Table>{children}</Table>
    </div>
  )
}

export default TableRoot
