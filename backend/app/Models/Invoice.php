<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $table = 'cao_fatura';
    protected $primaryKey = 'co_fatura';
    public $timestamps = false; // Si no necesitas marcas de tiempo created_at y updated_at

    protected $fillable = [
        'co_cliente',
        'co_sistema',
        'co_os',
        'num_nf',
        'total',
        'valor',
        'data_emissao',
        'corpo_nf',
        'comissao_cn',
        'total_imp_inc',
    ];

    // Define los campos que son fechas
    protected $dates = ['data_emissao'];
}
