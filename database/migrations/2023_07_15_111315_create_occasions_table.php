<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOccasionsTable extends Migration
{
    public function up()
    {
        Schema::create('occasions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('capacity');
            // Add more columns as needed.
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('occasions');
    }
}
