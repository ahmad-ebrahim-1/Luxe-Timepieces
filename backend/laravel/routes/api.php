<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\BasketController;
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


Route::middleware('auth:sanctum')->group(function () {
    Route::post('products/favorite/{user_id}', [FavoriteController::class, 'toggleFavorite']);
    Route::get('users/{userId}/favorites', [FavoriteController::class, 'getFavorites']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('products/{productId}/basket', [BasketController::class, 'addToBasket']);
});