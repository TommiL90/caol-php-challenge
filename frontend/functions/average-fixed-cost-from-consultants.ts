'use server'
import { prisma } from '@/lib/prisma'
import Decimal from 'decimal.js-light'

export const calculateAverageFixedCost = async () => {
  const averageFixedCost = await prisma.cao_salario
    .findMany()
    .then((consultants) => {
      const soma = consultants.reduce(
        (total, consultant) => total.plus(new Decimal(consultant.brut_salario)),
        new Decimal(0),
      )
      return soma.dividedBy(new Decimal(consultants.length)).toNumber()
    })

  return averageFixedCost
}
