<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoicesController extends Controller
{
    public function getInvoicesByConcultantsAndDate(Request $request){

        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        $consultants = $request->query('consultants');

        echo($startDate);
        echo($endDate);
        echo($consultants);

        return Invoice::all();
    }
}
