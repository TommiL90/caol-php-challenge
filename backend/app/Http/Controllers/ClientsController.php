<?php

namespace App\Http\Controllers;

use App\Services\ClientsService;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    public function getAll(){
        $clientsService = new ClientsService;

        $clients = $clientsService->findClients();

        return response()->json($clients, 200);
    }
}
