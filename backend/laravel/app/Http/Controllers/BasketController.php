<?php
// app/Http/Controllers/BasketController.php
namespace App\Http\Controllers;

use App\Models\Basket;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BasketController extends Controller
{
    public function addToBasket(Request $request, $productId)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $basketItem = Basket::create([
            'user_id' => $user->id,
            'product_id' => $productId,
        ]);

        return response()->json(['message' => 'Product added to basket', 'basketItem' => $basketItem], 201);
    }
}
