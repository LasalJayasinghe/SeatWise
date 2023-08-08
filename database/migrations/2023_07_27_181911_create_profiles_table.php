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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('description')->nullable();
            $table->string('cover')->nullable();
            $table->string('type')->nullable();
            $table->string('floors')->nullable();
            $table->time('opening')->nullable();
            $table->time('closing')->nullable();
            $table->timestamps();

            $table->foreign('restaurant_id')->references('id')->on('restaurants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
};
