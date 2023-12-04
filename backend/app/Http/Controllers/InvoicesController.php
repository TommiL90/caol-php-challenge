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
      
        $invoicesSevice = new InvoicesService;

        $invoices = $invoicesSevice->orderInvoicesByUserAndMonth($consultants, $startDate, $endDate);

        response()->json($invoices, 200);
    }

    public function getInvoicesByClientsAndDate(Request $request){

        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        $clients = $request->query('clients');

        $invoicesSevice = new InvoicesService;

        $invoices = $invoicesSevice->retrieveInvoicesByClients($clients, $startDate, $endDate);

        response()->json($invoices, 200);
    }
}
