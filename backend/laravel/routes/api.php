<?php
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\BasketController;
use Illuminate\Http\Request;

Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUser']);
Route::middleware('auth:sanctum')->delete('/users/{id}', [UserController::class, 'destroy']);
Route::middleware('auth:sanctum')->put('/users/{id}/type', [UserController::class, 'updateUserType']);

Route::controller(ProductController::class)->group(
    function () {
        Route::get('/products', [ProductController::class, 'index']); 
        Route::get('/products/{id}', [ProductController::class, 'show']);
        Route::post('/products', [ProductController::class, 'create']);
        Route::delete('/products/{id}', [ProductController::class, 'delete']);
        Route::put('/products/{id}', [ProductController::class, 'update']); 
    }
);



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('products/favorite/{productId}', [FavoriteController::class, 'toggleFavorite']);
    Route::get('users/favorites', [FavoriteController::class, 'getFavorites']);

});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('products/{productId}/basket', [BasketController::class, 'addToBasket']);
    Route::get('users/Basket', [BasketController::class, 'getItems']);
    Route::delete('/basket/{basketId}', [BasketController::class, 'removeFromBasket']);
    Route::patch('/basket/increase/{basketId}', [BasketController::class, 'increaseQuantity']);
     Route::patch('/basket/decrease/{basketId}', [BasketController::class, 'decreaseQuantity']);
});
