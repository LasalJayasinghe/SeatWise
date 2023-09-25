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
        Schema::create('cashiers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id');
           // Add the restaurant_id column as an unsigned big integer
            //    $table->string('brn');
           // Add a foreign key constraint to associate with the restaurants table
           
            $table->string('cashier_name');
            $table->string('email');
            $table->string('cashier_phone_number');
            $table->string('password');
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
        Schema::table('cashiers', function (Blueprint $table) {
            // Drop the foreign key constraint before dropping the column
            $table->dropForeign(['restaurant_id']);

            // Remove the restaurant_id column
            $table->dropColumn('restaurant_id');
        });
    }
};
