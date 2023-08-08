<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_structures', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id'); // Foreign key to link to the restaurant's table (provided by the restaurant admin)
            $table->string('table_number');
            $table->integer('number_of_chairs');
            $table->string('view'); // Sea view, wall view, etc.
            $table->integer('posX'); // New field to store the X-coordinate of the box
            $table->integer('posY'); // New field to store the Y-coordinate of the box
            $table->timestamps();

            // Add foreign key constraint
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        });
      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_structures');
    }
};
