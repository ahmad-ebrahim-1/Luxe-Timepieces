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
            'quantity' => 1        ]);

        return response()->json(['message' => 'Product added to basket', 'basketItem' => $basketItem], 201);
    }

    public function getItems()
    {

        $basketItem = Basket::where('user_id', Auth::id())
            ->with('product')
            ->get()
            ->map(function ($product) {
                return $product->product;
            });

        return response()->json($basketItem, 200);
    }
    public function removeFromBasket($basketId)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $basketItem = Basket::where('id', $basketId)->where('user_id', $user->id)->first();

        if (!$basketItem) {
            return response()->json(['message' => 'Basket item not found'], 404);
        }

        $basketItem->delete();

        return response()->json(['message' => 'Basket item removed'], 200);
    }
    public function increaseQuantity($basketId)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $basketItem = Basket::where('id', $basketId)->where('user_id', $user->id)->first();

        if (!$basketItem) {
            return response()->json(['message' => 'Basket item not found'], 404);
        }

        $basketItem->quantity += 1;
        $basketItem->save();

        return response()->json(['message' => 'Quantity increased', 'basketItem' => $basketItem], 200);
    }

    public function decreaseQuantity($basketId)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $basketItem = Basket::where('id', $basketId)->where('user_id', $user->id)->first();

        if (!$basketItem) {
            return response()->json(['message' => 'Basket item not found'], 404);
        }

        if ($basketItem->quantity > 1) {
            $basketItem->quantity -= 1;
            $basketItem->save();
            return response()->json(['message' => 'Quantity decreased', 'basketItem' => $basketItem], 200);
        } else {
            return response()->json(['message' => 'Quantity cannot be less than 1'], 400);
        }
    }
}

