<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\OS;

class InvoicesService
{
    private function retrieveOsByConsultants($consultants)
    {
        $consultantIds = array_column($consultants, 'co_usuario');

        $osByUsers = OS::whereIn('co_usuario', $consultantIds)->get();

        return $osByUsers;
    }

    private function retrieveInvoices($osByUsers, $startDate, $endDate)
    {
        $invoiceIds = array_column($osByUsers, 'co_os');

        $invoices = Invoice::whereIn('co_os', $invoiceIds)
            ->whereBetween('data_emissao', [$startDate->toDateString(), $endDate->toDateString()])
            ->get();

        return $invoices;
    }

    public function retrieveInvoicesByConsultantsAndDate($consultants, $startDate, $endDate)
    {
        $osByUsers = $this->retrieveOsByConsultants($consultants);
        $invoices = $this->retrieveInvoices($osByUsers, $startDate, $endDate);

        $invoicsByConsultantAndDate = array_reduce($osByUsers, function ($acc, $os) use ($invoices) {

            $user = $os['co_usuario'];

            if ($user !== null && $user !== '') {
                if (!isset($accumulator[$user])) {
                    $accumulator[$user] = [];
                }

                foreach ($invoices as $invoice) {
                    if ($invoice['co_os'] === $os['co_os']) {
                        $invoiceDate = new \DateTime($invoice['data_emissao']);
                        $monthKey = $invoiceDate->format('Y-m');
                    };

                    if (!isset($accumulator[$user][$monthKey])) {
                        $accumulator[$user][$monthKey] = [
                            'invoices' => [],
                            'totalNetValue' => 0,
                            'totalCommission' => 0,
                        ];
                    }

                    $value = bcmul($invoice['valor'], '1', 2);
                    $totalImpInc = bcmul(bcdiv($invoice['total_imp_inc'], '100', 4), $value, 2);
                    $netValue = bcsub($value, $totalImpInc, 2);
                    $porcentualCommission = bcdiv($invoice['comissao_cn'], '100', 4);
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
                        'receita_liquida' => floatval($netValue),
                        'comissao' => floatval($commission),
                    ];

                    $accumulator[$user][$monthKey]['invoices'][] = $formattedInvoice;
                    $accumulator[$user][$monthKey]['totalNetValue'] += floatval($netValue);
                    $accumulator[$user][$monthKey]['totalCommission'] += floatval($commission);
                };
            };


            return $acc;
        }, []);


        return $invoicsByConsultantAndDate;
    }
}
