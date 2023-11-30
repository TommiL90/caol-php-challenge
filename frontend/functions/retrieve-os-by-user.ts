'use server'
import { prisma } from '@/lib/prisma'
import { Consultant } from './retrieve-consultants'

export interface OS {
  co_os: number
  nu_os?: number | null
  co_sistema?: number | null
  co_usuario?: string | null
  co_arquitetura?: number | null
  ds_os?: string | null
  ds_caracteristica?: string | null
  ds_requisito?: string | null
  dt_inicio?: Date | null
  dt_fim?: Date | null
  co_status?: number | null
  diretoria_sol?: string | null
  dt_sol?: Date | null
  nu_tel_sol?: string | null
  ddd_tel_sol?: string | null
  nu_tel_sol2?: string | null
  ddd_tel_sol2?: string | null
  usuario_sol?: string | null
  dt_imp?: Date | null
  dt_garantia?: Date | null
  co_email?: number | null
  co_os_prospect_rel?: number | null
}
export const retrieveOsByConsultants = async (consultants: Consultant[]) => {
  const osByUsers = await prisma.cao_os.findMany({
    where: {
      co_usuario: { in: consultants.map((e) => e.co_usuario) },
    },
  })

  return osByUsers
}
// 1
