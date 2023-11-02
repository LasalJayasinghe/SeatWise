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
        Schema::create('hall_reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('restaurant_id');
            $table->string('reservant_name');
            $table->string('email_address');
            $table->string('contact_number');
            $table->string('Occasion type');
            $table->string('Description');
            $table->unsignedBigInteger('Slot_id');
            $table->unsignedBigInteger('hall_id');
            $table->date('slot_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->tinyInteger('Transaction_status');

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
        Schema::dropIfExists('hall_reservations');
    }
};
