<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     DB::create(
    [
            'name' => 'Luxurious Watch',
            'slug' => 'luxurios-watch',
            
        ]);
           DB::table('products')->insert([
            'title' => 'Example Product',
            'brand' => 'Example Brand',
            'description' => 'This is an example product description.',
            'image_name' => 'example_image.jpg',
            'price' => '99.99',
            'sale_price' => '79.99',
            'created_at' => now(),
            'updated_at' => now(),
           ]);
    }
}
