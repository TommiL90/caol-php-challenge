<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Client;

class ClientsService {
    public function findClients() {
        $clients = Client::where('tp_cliente', 'A')->get();
        

        return $clients;    
    }

}