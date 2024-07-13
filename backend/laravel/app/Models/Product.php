<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //use HasFactory;
   protected $guarded= [];
    protected $model = Product::class;

    public function definition()
    {
        return [
            'title' => $this->faker->words(3, true),
            'brand' => $this->faker->company,
            'description' => $this->faker->paragraph,
            'image_name' => $this->faker->image('public/storage/images', 640, 480, null, false),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'sale_price' => $this->faker->optional()->randomFloat(2, 5, 900),
            'categorie_id' => null, // Assuming it can be nullable for now
        ];
    }
}
