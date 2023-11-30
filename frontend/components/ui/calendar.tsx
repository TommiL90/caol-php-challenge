/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import * as React from 'react'
import { Dispatch, SetStateAction } from 'react'
import { Label } from './label'
import { Input } from './input'
import { DateRange, useDateRange } from '@/hooks/useDateRange'

interface CalendarProps {
  setDate: Dispatch<SetStateAction<DateRange | undefined>>
}

function Calendar({ setDate }: CalendarProps) {
  const { startMonth, endMonth, handleStartMonthChange, handleEndMonthChange } =
    useDateRange(setDate)

  return (
    <div className="p-4">
      <Label className="mb-2 block font-bold" htmlFor="startMonth">
        Desde (MM-YYYY):
      </Label>
      <Input
        id="startMonth"
        type="month"
        min="2007-01"
        max="2007-12"
        value={startMonth}
        onChange={handleStartMonthChange}
        lang="pt-Br"
      />
      <Label className="mb-2 mt-4 block font-bold" htmlFor="endMonth">
        Até (MM-YYYY):
      </Label>
      <Input
        id="endMonth"
        type="month"
        min="2007-01"
        max="2007-12"
        value={endMonth}
        onChange={handleEndMonthChange}
        lang="pt-Br"
      />
    </div>
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
