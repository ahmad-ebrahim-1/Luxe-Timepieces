<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
   protected $guarded= [];
    protected $model = Product::class;

    protected $fillable = [
        'title',
        'brand' ,
        'description',
        'image_name',
        'price' ,
        'type',
    ];
}
