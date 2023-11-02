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
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->unsignedBigInteger('restaurantID');
            $table->unsignedBigInteger('UserID');
            $table->string('reply');
            
            $table->foreign('restaurantID')->references('id')->on('restaurants')->onDelete('cascade');
            
            $table->foreign('UserID')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('complaints');
    }
};
