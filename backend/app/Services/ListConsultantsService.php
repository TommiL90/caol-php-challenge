<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\CaoUser;

class ListConsultantsService {
    public function findWithAuth() {
        $consultants = CaoUser::join('permissao_sistema as ps', 'cao_usuario.co_usuario', '=', 'ps.co_usuario')
        ->select( 'cao_usuario.co_usuario', 'cao_usuario.no_usuario')
        ->where('ps.co_sistema', 1)
        ->where('ps.in_ativo', 'S')
        ->whereIn('ps.co_tipo_usuario', [0, 1, 2])
        ->get();
        

        return $consultants;    
    }

}