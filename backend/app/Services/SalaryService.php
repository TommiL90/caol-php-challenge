<?php

namespace App\Services;

use App\Models\Salary;

class SalaryService
{
  public function getFixedCostFromConsultants()
  {

    $consultantsService = new ListConsultantsService;

    $consultants =  $consultantsService->findWithAuth();

    $consultantsArray = $consultants->toArray();

    $fixedCosts = Salary::whereIn('co_usuario', array_column($consultantsArray, 'co_usuario'))
      ->get(['co_usuario', 'brut_salario'])
      ->toArray();
    
    return $fixedCosts;
  }

  public function calculateAverageFixedCost()
{
    $salaries = Salary::all();

    if ($salaries->isEmpty()) {
        return null;
    }

    $totalSalary = $salaries->reduce(function ($total, $salary) {
        return $total + $salary->brut_salario;
    }, 0);

    $averageFixedCost = $totalSalary / $salaries->count();

    return $averageFixedCost;
}
}
