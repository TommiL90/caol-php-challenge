/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export type DateRange = {
  from: Date | undefined
  to?: Date | undefined
}

export const useDateRange = (
  setDate: Dispatch<SetStateAction<DateRange | undefined>>,
) => {
  const [startMonth, setStartMonth] = useState<string>('')
  const [endMonth, setEndMonth] = useState<string>('')

  const updateDateRange = () => {
    const fromDateParts = startMonth.split('-')
    const toDateParts = endMonth.split('-')

    if (fromDateParts.length === 2 && toDateParts.length === 2) {
      const fromYear = parseInt(fromDateParts[0])
      const fromMonth = parseInt(fromDateParts[1]) - 1
      const toYear = parseInt(toDateParts[0])
      const toMonth = parseInt(toDateParts[1]) - 1

      const fromDate = new Date(fromYear, fromMonth, 1)
      const toDate = new Date(toYear, toMonth + 1, 0)

      if (fromDate > toDate) {
        alert('A data de início não pode ser maior que a data de término')
      }

      setDate({ from: fromDate, to: toDate })
    } else {
      setDate({ from: undefined, to: undefined })
    }
  }

  const handleStartMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartMonth(e.target.value)
  }

  const handleEndMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndMonth(e.target.value)
  }

  useEffect(() => {
    updateDateRange()
  }, [startMonth, endMonth])

  return {
    startMonth,
    endMonth,
    handleStartMonthChange,
    handleEndMonthChange,
  }
}
