'use client'
import React from 'react'
import {
  TableRow,
  TableHead,
  TableHeader as TableHeaderUI,
} from '@/components/ui/table'

const TableHeader = () => {
  return (
    <TableHeaderUI>
      <TableRow>
        <TableHead>Mes</TableHead>
        <TableHead>Receita Líquida</TableHead>
        <TableHead>Custo Fixo</TableHead>
        <TableHead>Comissão</TableHead>
        <TableHead>Lucro</TableHead>
      </TableRow>
    </TableHeaderUI>
  )
}

export default TableHeader
