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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();

         $table->unsignedBigInteger('restaurant_id');
         $table->String('meal');	
		 $table->String('offer_type');
		 $table->String('offer_title');
		 $table->unsignedBigInteger('offer_percentage');	
		 $table->date('start_date');		
		 $table->date('end_date');
		 $table->String('days_of_week');	
		 $table->unsignedBigInteger('minimum_purchase_amount');	
		 $table->String('offer_description');
        
         $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
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
        Schema::dropIfExists('offers');
    }
};
