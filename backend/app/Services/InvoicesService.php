<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\OS;
use DateTime;

class InvoicesService
{
    private function retrieveOsByConsultants($consultants)
    {
        $consultantIds = array_column($consultants, 'co_usuario');
        $osByUsers = OS::whereIn('co_usuario', $consultantIds)->get();

        return $osByUsers;
    }

    private function retrieveInvoicesByUsers($osByUsers, $startDate, $endDate)
    {
        $CoOsIds = array_column($osByUsers->toArray(), 'co_os');
       
        $invoices = Invoice::whereIn('co_os', $CoOsIds)
            ->whereBetween('data_emissao', [$startDate, $endDate])
            ->get();
        return $invoices;
    }

    public function retrieveInvoicesByClients($clients, $startDate, $endDate)
    {
        $clientIds = array_column($clients, 'co_cliente');

        $invoices = Invoice::whereIn('co_cliente', $clientIds)
            ->whereBetween('data_emissao', [$startDate, $endDate])
            ->get();
        return $invoices;
    }

    public function orderInvoicesByUserAndMonth($consultants, $startDate, $endDate) {

        $osByUsers = $this->retrieveOsByConsultants($consultants);

        $invoices = $this->retrieveInvoicesByUsers($osByUsers, $startDate, $endDate);

        $invoicesByUserAndMonth = [];
    
        foreach ($osByUsers as $os) {
            $user = $os['co_usuario'];
    
            if ($user !== null && $user !== '') {
                if (!isset($invoicesByUserAndMonth[$user])) {
                    $invoicesByUserAndMonth[$user] = [];
                }
    
                foreach ($invoices as $invoice) {
                    if ($invoice['co_os'] === $os['co_os']) {
                        $invoiceDate = new DateTime($invoice['data_emissao']);
                        $monthKey = $invoiceDate->format('Y-m');
    
                        if (!isset($invoicesByUserAndMonth[$user][$monthKey])) {
                            $invoicesByUserAndMonth[$user][$monthKey] = [
                                'invoices' => [],
                                'totalNetValue' => '0',
                                'totalCommission' => '0', 
                            ];
                        }
    
                        $value = $invoice['valor'];
                        $totalImpInc = bcmul($value, bcdiv($invoice['total_imp_inc'], 100, 2), 2);
                        $netValue = bcsub($value, $totalImpInc, 2);
                        $porcentualCommission = bcdiv($invoice['comissao_cn'], 100, 2);
                        $commission = bcmul($porcentualCommission, $netValue, 2);
    
                        $formattedInvoice = [
                            'co_fatura' => $invoice['co_fatura'],
                            'co_cliente' => $invoice['co_cliente'],
                            'co_sistema' => $invoice['co_sistema'],
                            'co_os' => $invoice['co_os'],
                            'num_nf' => $invoice['num_nf'],
                            'total' => $invoice['total'],
                            'valor' => $invoice['valor'],
                            'data_emissao' => $invoice['data_emissao'],
                            'corpo_nf' => $invoice['corpo_nf'],
                            'comissao_cn' => $invoice['comissao_cn'],
                            'total_imp_inc' => $invoice['total_imp_inc'],
                            'receita_liquida' => $netValue,
                            'comissao' => $commission,
                        ];
    
                        $invoicesByUserAndMonth[$user][$monthKey]['invoices'][] = $formattedInvoice;
                        $invoicesByUserAndMonth[$user][$monthKey]['totalNetValue'] = bcadd(
                            $invoicesByUserAndMonth[$user][$monthKey]['totalNetValue'],
                            $netValue,
                            2
                        );
                        $invoicesByUserAndMonth[$user][$monthKey]['totalCommission'] = bcadd(
                            $invoicesByUserAndMonth[$user][$monthKey]['totalCommission'],
                            $commission,
                            2
                        );
                    }
                }
            }
        }
    
        return $invoicesByUserAndMonth;
    }
}
