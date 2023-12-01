export const formatNumberAsCurrency = (
  number: number,
  options: Intl.NumberFormatOptions = {},
): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }

  const mergedOptions = { ...defaultOptions, ...options }

  const numberFormatter = new Intl.NumberFormat('pt-BR', mergedOptions)
  return numberFormatter.format(number)
}
