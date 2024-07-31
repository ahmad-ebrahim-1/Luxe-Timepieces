<?php
use App\Http\Controllers\API\UserController;
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
        Route::post('/products/{productId}/upload-image', [ProductController::class, 'uploadProductImage']);
        Route::post('/products', [ProductController::class, 'create']);
    }
);


Route::middleware('auth:api')->get('/user', [UserController::class, 'getUser']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
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