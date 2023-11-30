<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\CaoUser;

class ListConsultantsService {
    public function findWithAuth() {
        $consultants = CaoUser::join('permissao_sistema', 'cao_usuario.co_usuario', '=', 'permissao_sistema.co_usuario')
            ->select('cao_usuario.*', 'permissao_sistema.*')
            ->where('permissao_sistema.co_sistema', '=', 1)
            ->where('permissao_sistema.in_ativo', '=', 'S')
            ->whereIn('permissao_sistema.co_tipo_usuario', [0, 1, 2])
            ->get();

        return $consultants;    
    }

}