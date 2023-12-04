<?php

namespace App\Http\Controllers;

use App\Services\SalaryService;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    public function getFixedCostByConsultants(){
      
        $salaryService  = new SalaryService;

        $fixedCost  = $salaryService->getFixedCostFromConsultants();;

        return $fixedCost;
    }

    public function getAverageFixedCostFromConsultants() {

        $salaryService  = new SalaryService;

        $averageFixedCost = $salaryService->calculateAverageFixedCost();

        return $averageFixedCost;
    }
}
