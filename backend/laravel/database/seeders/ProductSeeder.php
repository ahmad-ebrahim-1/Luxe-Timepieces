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

        

        DB::table('products')->insert([
            [
                'id' => 1,
                'title' => 'Luxury Watch',
                'brand' => 'Rolex',
                'description' => 'A luxurious Rolex watch.',
                'image_name' => 'rolex.jpg',
                'price' => 9999.99,
                'sale_price' => 8999.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [   'id'=> 2,
                'title' => 'Sport Watch',
                'brand' => 'Omega',
                'description' => 'A high-performance Omega sport watch.',
                'image_name' => 'omega.jpg',
                'price' => 4999.99,
                'sale_price' => 4499.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],]);
        }
        }