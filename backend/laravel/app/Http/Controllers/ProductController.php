<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Favourite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
   public function index()
   {
      $products = Product::all();
      return response()->json($products);
   }

   public function show($id)
   {
      $product = Product::find($id);
      if ($product) {
         return response()->json($product);
      } else {
         return response()->json(['message' => 'Product not found'], 404);
      }
   }

   public function addToFavorites($productId)
   {
      $userId = Auth::id(); // Get the authenticated user's ID

      // Check if the product exists
      $product = Product::find($productId);
      if (!$product) {
         return response()->json(['message' => 'Product not found'], 404);
      }

      // Check if the product is already in the user's favorites
      $favorite = Favourite::where('user_id', $userId)->where('product_id', $productId)->first();
      if ($favorite) {
         return response()->json(['message' => 'Product is already in your favorites']);
      }

      // Add the product to the user's favorites
      Favourite::create([
         'user_id' => $userId,
         'product_id' => $productId,
      ]);

      return response()->json(['message' => 'Product added to favorites']);
   }
}
