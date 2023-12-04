'use client'
import React, { useContext } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { FinancialContext } from '@/contexts/financial-context'
import { CalendarIcon } from '@radix-ui/react-icons'

const SelectUserFooterConsultants = () => {
  const { getReport, date, setDate } = useContext(FinancialContext)
  return (
    <div className="flex items-center justify-center gap-8 space-x-2">
      <div className="flex flex-col gap-2">
        <Label className="flex gap-2" htmlFor="range-date">
          <CalendarIcon /> <span>Periodo</span>
        </Label>
        <CalendarDateRangePicker
          date={date}
          setDate={setDate}
          id="range-date"
          aria-label="Select date range"
        />
      </div>
      <Button onClick={getReport} className="h-full">
        Gerar Relatário
      </Button>
    </div>
  )
}

export default SelectUserFooterConsultants
