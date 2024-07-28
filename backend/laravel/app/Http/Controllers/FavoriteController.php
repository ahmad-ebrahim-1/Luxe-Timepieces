<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function toggleFavorite(Request $request, $productId)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $favorite = Favourite::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if ($favorite) {
            // If the favorite exists, delete it
            $favorite->delete();
            return response()->json(['message' => 'Product removed from favorites'], 200);
        } else {
            // If the favorite does not exist, create it
            $product = Product::find($productId);

            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            Favourite::create([
                'user_id' => $user->id,
                'product_id' => $productId,
            ]);

            return response()->json(['message' => 'Product added to favorites'], 201);
        }
    }
    public function getFavorites($userId)
    {
        // Ensure the authenticated user matches the requested user ID
        if (Auth::id() !== (int) $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $favorites = Favourite::where('user_id', $userId)
            ->with('product')
            ->get()
            ->map(function ($favorite) {
                return $favorite->product;
            });

        return response()->json($favorites, 200);
    }
}




