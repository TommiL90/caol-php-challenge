'use client'

import { createArrUsers } from '@/functions/create-array-users'
import {
  InvoicesByUserAndMonth,
  orderInvoicesByUserAndMonth,
} from '@/functions/order-os-by-user-and-month'
import { Consultant } from '@/functions/retrieve-consultants'
import {
  FixedCostFromConsultans,
  fixedCostFromConsultant,
} from '@/functions/retrieve-fixed-costs-from-consultants'
import {
  MonthObjectArray,
  transformMonthObjectToArray,
} from '@/functions/transform-to-month-object-array'
import {
  UserSummaries,
  calculateUserSummaries,
} from '@/functions/user-summaries'
import useConsultants from '@/hooks/useConsultants'
import { DateRange } from '@/hooks/useDateRange'
import { api } from '@/services/api'
import { addDays } from 'date-fns'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

interface IFinancialContext {
  reportTable: InvoicesByUserAndMonth
  reportGraphic: MonthObjectArray[]
  reportPizza: UserSummaries[]
  fixedCostfromConsultantData: FixedCostFromConsultans[]
  userArr: string[]
  movedUsers: Consultant[]
  availableUsers: Consultant[]
  selectedUsers: Consultant[]
  handleUserClick: (user: Consultant) => void
  handleMove: (direction: 'left' | 'right') => void
  date: DateRange | undefined
  setDate: Dispatch<SetStateAction<DateRange | undefined>>
  getReport: () => Promise<void>
}

interface IChildrenProps {
  children: React.ReactNode
}

export const FinancialContext = createContext({} as IFinancialContext)
export const FinancialProvider = ({ children }: IChildrenProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2007, 0, 1),
    to: addDays(new Date(2007, 1, 20), 30),
  })
  const {
    availableUsers,
    selectedUsers,
    movedUsers,
    handleUserClick,
    handleMove,
  } = useConsultants()
  const [reportTable, setReportTable] = useState<InvoicesByUserAndMonth>({})
  const [reportGraphic, setReportGraphic] = useState<MonthObjectArray[]>([])
  const [reportPizza, setReportPizza] = useState<UserSummaries[]>([])
  const [fixedCostfromConsultantData, setfixedCostfromConsultantData] =
    useState<FixedCostFromConsultans[]>([])
  const [userArr, setUserArr] = useState<string[]>([])

  const getReport = async () => {
    if (date?.from && date?.to && movedUsers.length > 0) {
      const startDate = new Date(date.from)
      const endDate = new Date(date.to)

      const response = await api.get('invoicesbyconsultants', {
        params: {
          consultants: movedUsers,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        } })

      const data: InvoicesByUserAndMonth  = response.data  
      //delete
      //const os = await retrieveOsByConsultants(movedUsers)

      //const invoices = await retrieveInvoices(os, startDate, endDate)

      //const invoicesByUserAndMonth = await orderInvoicesByUserAndMonth(
      //  os,
      //  invoices,
      //)
      //console.log(invoicesByUserAndMonth)
      setReportTable(data)

      const monthObjectToArr = await transformMonthObjectToArray(
        data,
      )

      setReportGraphic(monthObjectToArr)

      const summariesbyUser = await calculateUserSummaries(
        data,
      )

      setReportPizza(summariesbyUser)

      const arr = await createArrUsers(monthObjectToArr)

      setUserArr(arr)
    } else {
      alert('date or users are undefined')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fixedCostUsersData = await fixedCostFromConsultant()
        const response = await api.get('fixed-cost')
        //console.log(response.data)
        //console.log(fixedCostUsersData)
        setfixedCostfromConsultantData(fixedCostUsersData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <FinancialContext.Provider
      value={{
        reportTable,
        reportGraphic,
        reportPizza,
        userArr,
        getReport,
        availableUsers,
        fixedCostfromConsultantData,
        selectedUsers,
        movedUsers,
        handleUserClick,
        handleMove,
        date,
        setDate,
      }}
    >
      {children}
    </FinancialContext.Provider>
  )
}
