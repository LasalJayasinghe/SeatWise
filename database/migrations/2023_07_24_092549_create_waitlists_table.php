<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaitlistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('waitlists', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Add the 'name' column to store the user's name
            $table->string('email'); // Add the 'email' column to store the user's email
            $table->unsignedBigInteger('selected_slot_id'); // Add the 'selected_slot_id' column to store the selected time slot ID
            $table->date('selected_date'); // Add the 'selected_date' column to store the selected date
            $table->unsignedBigInteger('user_id')->nullable(); // Add the 'user_id' column to store the logged-in user's ID
            $table->timestamps();

            // Define foreign key constraint for 'selected_slot_id'
            $table->foreign('selected_slot_id')->references('id')->on('time_availabilities');

            // Define foreign key constraint for 'user_id'
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('waitlists');
    }
}

