<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;


Route::controller(ProductController::class)->group(
    function () {
        Route::get('/products', 'index');
         Route::get('/products/{id}', 'show');
         Route::post('/products', 'store');
    }
);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
