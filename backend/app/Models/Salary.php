<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $table = 'cao_salario'; // 
    protected $primaryKey = ['co_usuario', 'dt_alteracao'];

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'co_usuario',
        'dt_alteracao',
        'brut_salario',
        'liq_salario',
    ];

    protected $casts = [
        'dt_alteracao' => 'datetime',
        'brut_salario' => 'float',
        'liq_salario' => 'float',
    ];


    protected $dates = ['dt_alteracao'];
}
