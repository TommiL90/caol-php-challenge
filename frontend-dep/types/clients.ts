export interface Client {
  co_cliente: number
  no_razao?: string | null
  no_fantasia?: string | null
  no_contato?: string | null
  nu_telefone?: string | null
  nu_ramal?: string | null
  nu_cnpj?: string | null
  ds_endereco?: string | null
  nu_numero?: number | null
  ds_complemento?: string | null
  no_bairro: string
  nu_cep?: string | null
  no_pais?: string | null
  co_ramo?: bigint | null
  co_cidade: bigint
  co_status?: number | null
  ds_site?: string | null
  ds_email?: string | null
  ds_cargo_contato?: string | null
  tp_cliente?: string | null
  ds_referencia?: string | null
  co_complemento_status?: number | null
  nu_fax?: string | null
  ddd2?: string | null
  telefone2?: string | null
}
