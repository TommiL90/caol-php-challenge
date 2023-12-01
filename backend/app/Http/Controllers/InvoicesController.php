<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Services\InvoicesService;
use Illuminate\Http\Request;

class InvoicesController extends Controller
{
    public function getInvoicesByConcultantsAndDate(Request $request){

        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        $consultants = $request->query('consultants');
      
        $invoices = new InvoicesService;

        return $invoices->orderInvoicesByUserAndMonth($consultants, $startDate, $endDate);
    }

    public function getInvoicesByClientsAndDate(Request $request){

        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        $clients = $request->query('clients');
      
        $invoices = new InvoicesService;

        return $invoices->retrieveInvoicesByClients($clients, $startDate, $endDate);
    }
}
