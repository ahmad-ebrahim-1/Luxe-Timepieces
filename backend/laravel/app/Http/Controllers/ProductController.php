<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Favourite;
use App\Models\Basket;
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

   public function create(Request $request)
   {
      $request->validate([
         'title' => 'required|string|max:255',
         'brand' => 'required|string|max:255',
         'description' => 'required|string',
         'image_name' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
         'type' => 'required|in:Smart,Basic',
         'price' => 'required|numeric',
      ]);

      $imagePath = null;
      if ($request->hasFile('image_name')) {
         $image = $request->file('image_name');
         $imagePath = $image->store('product_images', 'public');
      }
      $product = Product::create([
            'title' => $request->input('title'),
            'brand' => $request->input('brand'),
            'description' => $request->input('description'),
            'image_name' => $imagePath ? Storage::url($imagePath) : null, // Store the image URL if uploaded
            'type' => $request->input('type'),
            'price' => $request->input('price'),
         ]);

      return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
   }

   public function delete($id)
   {
      $product = Product::find($id);
      if (!$product) {
         return response()->json(['message' => 'Product not found'], 404);
      }
      if ($product->image_name) {
         $filePath = str_replace('/storage/', '', $product->image_name);
         if (Storage::exists($filePath)) {
            Storage::delete($filePath);
         }
      }
      Basket::where('product_id', $id)->delete();
      Favourite::where('product_id', $id)->delete();
      $product->delete();
      return response()->json(['message' => 'Product deleted successfully'], 200);
   }

   public function update(Request $request, $id)
   {
      $request->validate([
         'title' => 'nullable|string|max:255',
         'brand' => 'nullable|string|max:255',
         'description' => 'nullable|string',
         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
         'type' => 'nullable|in:Smart,Basic',
         'price' => 'nullable|numeric',

      ]);
      $product = Product::find($id);
      if (!$product) {
         return response()->json(['message' => 'Product not found'], 404);
      }
      
      if ($request->hasFile('image')) {
         if ($product->image_name) {
            $oldImagePath = str_replace('/storage/', '', $product->image_name);
            if (Storage::exists($oldImagePath)) {
               Storage::delete($oldImagePath);
            }
         }

         $image = $request->file('image');
         $imagePath = $image->store('product_images', 'public');
         $imageUrl = Storage::url($imagePath);
      } else {
         $imageUrl = $product->image_name; 
      }

      $product->update([
         'title' => $request->input('title', $product->title),
         'brand' => $request->input('brand', $product->brand),
         'description' => $request->input('description', $product->description),
         'image_name' => $imageUrl,
         'type' => $request->input('type', $product->type),
         'price' => $request->input('price', $product->price),
      ]);

      if ($product->wasChanged()) {
         return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
      } else {
         return response()->json(['message' => 'No changes made to the product'], 200);
      }
   }
}