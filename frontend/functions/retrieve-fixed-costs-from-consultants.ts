'use server'
import { prisma } from '@/lib/prisma'
import { retrieveConsultants } from './retrieve-consultants'

export interface FixedCostFromConsultans {
  co_usuario: string
  brut_salario: number
}
export const fixedCostFromConsultant = async (): Promise<
  FixedCostFromConsultans[]
> => {
  const consultants = await retrieveConsultants()

  const fixedCost = await prisma.cao_salario
    .findMany({
      where: { co_usuario: { in: consultants.map((e) => e.co_usuario) } },
    })
    .then((res) =>
      res.map((e) => ({
        co_usuario: e.co_usuario,
        brut_salario: e.brut_salario,
      })),
    )

  return fixedCost
}
