<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('id');
             $table->string('title');
            $table->string('brand');
            $table->string('description');
            $table->string('image_name');
            $table->string('price');
            $table->string('sale_price');
                // $table->unsignedBigInteger('categorie_id');
            //$table->foreign('categorie_id')->references('id')->on('categorie');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
