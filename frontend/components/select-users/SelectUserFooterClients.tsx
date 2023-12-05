'use client'
import React, { useContext } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { ClientsContext } from '@/contexts/client-context'

const SelectUserFooterClients = () => {
  const { getReport, date, setDate, loading } = useContext(ClientsContext)
  return (
    <div className="flex items-center justify-center gap-8 space-x-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="range-date">Periodo</Label>
        <CalendarDateRangePicker
          date={date}
          setDate={setDate}
          id="range-date"
        />
      </div>
      <Button onClick={getReport} className="h-full">
        {loading ? 'Carregando data' : 'Generar Relatório'}
      </Button>
    </div>
  )
}

export default SelectUserFooterClients
