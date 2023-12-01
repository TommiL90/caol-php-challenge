<?php

namespace App\Http\Controllers;

use App\Services\SalaryService;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    public function getFixedCostByConsultants(Request $request){
      
        $fixedCost  = new SalaryService;

        return $fixedCost->getFixedCostFromConsultants();
    }

    public function getAverageFixedCostFromConsultants() {

        $averageFixedCost  = new SalaryService;

        return $averageFixedCost->calculateAverageFixedCost();
    }
}
