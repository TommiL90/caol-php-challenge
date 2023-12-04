'use client'

import * as React from 'react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { HTMLAttributes } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import { DateRange } from '@/hooks/useDateRange'

interface CalendarDateRangePickerProps extends HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}
export function CalendarDateRangePicker({
  className,
  date,
  setDate,
}: CalendarDateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL y', { locale: ptBR })} -{' '}
                  {format(date.to, 'LLL y', { locale: ptBR })}
                </>
              ) : (
                format(date.from, 'LLL y', { locale: ptBR })
              )
            ) : (
              <span>Selecionar um Periodo</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar setDate={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
