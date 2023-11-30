export const getMonthNameWithYear = (yearMonth: string) => {
  const splitDate = yearMonth.split('-')
  const year = parseInt(splitDate[0], 10)
  const month = parseInt(splitDate[1], 10)

  const date = new Date(year, month - 1)

  const yearNumeric = date.toLocaleString('pt-BR', { year: 'numeric' })
  const monthName =
    date.toLocaleString('pt-BR', { month: 'long' }).charAt(0).toUpperCase() +
    date.toLocaleString('pt-BR', { month: 'long' }).slice(1)

  return { monthName, yearNumeric }
}
