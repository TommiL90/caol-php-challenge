<?php

use App\Http\Controllers\ConsultantsController;
use App\Http\Controllers\invoiceController;
use App\Http\Controllers\InvoicesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/use', function (Request $request) {
    return $request->user();
});


Route::get('/consultants', [ConsultantsController::class, 'getAll']);

Route::get('/invoicesbyconsultants', [InvoicesController::class, 'getInvoicesByConcultantsAndDate']);