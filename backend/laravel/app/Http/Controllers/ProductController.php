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
/* public function uploadProductImage(Request $request, $productId)
   {
      // Validate the incoming request
      $request->validate([
         'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
      ]);

      // Find the product
      $product = Product::find($productId);

      if (!$product) {
         return response()->json(['message' => 'Product not found'], 404);
      }

      // Handle the image upload
      if ($request->hasFile('image')) {
         $image = $request->file('image');
         $path = $image->store('product_images', 'public');

         // Generate the URL for the uploaded image
         $url = Storage::url($path);

         // Update the product's image URL in the database
         $product->image = $url;
         $product->save();

         return response()->json(['url' => $url, 'productId' => $product->id], 200);
      }

      return response()->json(['message' => 'No image uploaded'], 400);
   }
}*/

   public function create(Request $request)
   {
      // Validate the incoming request
      $request->validate([
         'title' => 'required|string|max:255',
         'brand' => 'required|string|max:255',
         'description' => 'required|string',
         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
         'type' => 'required|in:Smart,Basic',
         'price' => 'required|numeric',
         'sale_price' => 'required|numeric',
      ]);

      // Handle the image upload if present
      $imagePath = null;
      if ($request->hasFile('image')) {
         $image = $request->file('image');
         $imagePath = $image->store('product_images', 'public');
      }

      // Create the product
      $product = Product::create([
            'title' => $request->input('title'),
            'brand' => $request->input('brand'),
            'description' => $request->input('description'),
            'image_name' => $imagePath ? Storage::url($imagePath) : null, // Store the image URL if uploaded
            'type' => $request->input('type'),
            'price' => $request->input('price'),
            'sale_price' => $request->input('sale_price'),
         ]);

      return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
   }
}