<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Favourite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
   public function uploadProductImage(Request $request)
   {
      // Validate the incoming request
      $request->validate([
         'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
      ]);

      // Handle the image upload
      if ($request->hasFile('image')) {
         $image = $request->file('image');
         $path = $image->store('product_images', 'public');

         // Generate the URL for the uploaded image
         $url = Storage::url($path);

         return response()->json(['url' => $url], 201);
      }

      return response()->json(['message' => 'No image uploaded'], 400);
   }
}