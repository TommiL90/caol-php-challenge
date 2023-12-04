<?php

namespace App\Http\Controllers;

use App\Services\SalaryService;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    public function getFixedCostByConsultants(Request $request){
      
        $salaryService  = new SalaryService;

        $fixedCost  = $salaryService->getFixedCostFromConsultants();;

        response()->json($fixedCost, 200);
    }

    public function getAverageFixedCostFromConsultants() {

        $salaryService  = new SalaryService;

        $averageFixedCost = $salaryService->calculateAverageFixedCost();

        response()->json($averageFixedCost, 200);
    }
}
