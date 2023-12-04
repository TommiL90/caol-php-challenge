export const getMonthName = (yearMonth: string) => {
  const splitDate = yearMonth.split('-')
  const month = parseInt(splitDate[1], 10)

  const date = new Date()

  date.setMonth(month - 1)

  return date.toLocaleString('pt-BR', { month: 'long' })
}
