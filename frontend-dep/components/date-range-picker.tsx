/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import * as React from 'react'
import { addMonths, format } from 'date-fns'
import { DayPicker } from "react-day-picker"
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
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

  const [startMonth, setStartMonth] = React.useState<Date>(new Date(2007, 0, 1));
  const [endMonth, setEndMonth] = React.useState<Date>(startMonth);

  React.useEffect(() => {
    const year = endMonth.getFullYear();
    const month = endMonth.getMonth();
    const formatEndDate = new Date(year, month + 1, 0);

    console.log(formatEndDate)

    setDate({ from: startMonth, to: formatEndDate });
  }, [endMonth]);

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
          <h5>De:</h5>
          <DayPicker month={startMonth} onMonthChange={setStartMonth}
            fromYear={2007}
            toYear={2007}
            className={cn("p-3", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle:
                "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
          <h5>Até:</h5>
           <DayPicker month={endMonth} onMonthChange={setEndMonth}
            fromYear={2007}
            toYear={2007}
            className={cn("p-3", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle:
                "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

