<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoPermission extends Model
{
    use HasFactory;

    protected $table = 'permissao_sistema';
    public $timestamps = false;

    protected $primaryKey = ['co_usuario', 'co_tipo_usuario', 'co_sistema'];

    protected $fillable = [
        'co_usuario',
        'co_tipo_usuario',
        'co_sistema',
        'in_ativo',
        'co_usuario_atualizacao',
        'dt_atualizacao',
    ];

    protected $dates = ['dt_atualizacao'];
}
