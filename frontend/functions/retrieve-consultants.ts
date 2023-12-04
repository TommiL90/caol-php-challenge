'use server'
import { prisma } from '@/lib/prisma'

export interface Consultant {
  co_usuario: string
  no_usuario: string
}

export const retrieveConsultants = async (): Promise<Consultant[]> => {
  const consultants: Consultant[] = await prisma.$queryRaw`
    SELECT
      cu.co_usuario,
      cu.no_usuario
    FROM cao_usuario cu
    JOIN permissao_sistema ps
    ON cu.co_usuario = ps.co_usuario
    WHERE
      ps.co_sistema = 1
      AND ps.in_ativo = 'S'
      AND ps.co_tipo_usuario IN (0, 1, 2)
  `

  return consultants
}
