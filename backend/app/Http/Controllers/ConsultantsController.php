<?php

namespace App\Http\Controllers;

use App\Models\CaoUser;
use App\Services\ListConsultantsService;
use Illuminate\Http\Request;

class ConsultantsController extends Controller
{
    public function getAll(){
        $consultantsService = new ListConsultantsService;

        $consultants = $consultantsService->findWithAuth();

        return response()->json($consultants, 200);
    }
}
