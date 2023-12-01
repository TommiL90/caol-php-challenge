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
}
