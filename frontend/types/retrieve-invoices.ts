export interface RetrieveInvoice {
  co_fatura: number
  co_cliente: number
  co_sistema: number
  co_os: number
  num_nf: number
  total: number
  valor: number
  data_emissao: Date
  corpo_nf: string
  comissao_cn: number
  total_imp_inc: number
}