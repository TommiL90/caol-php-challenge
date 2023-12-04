'use server'
export const createArrUsers = async (data: any[]): Promise<string[]> => {
  const keysSet = new Set<string>()

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== 'month' && key !== 'averageFixedCost') {
        keysSet.add(key)
      }
    })
  })

  return Array.from(keysSet)
}
