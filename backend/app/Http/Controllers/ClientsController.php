<?php

namespace App\Http\Controllers;

use App\Services\ClientsService;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    public function getAll(){
        $clients = new ClientsService;

        return $clients->findClients();
    }
}
