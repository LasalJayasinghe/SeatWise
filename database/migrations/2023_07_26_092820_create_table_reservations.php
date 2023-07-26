<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableReservations extends Migration
{
    public function up()
    {
        Schema::create('table_reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id'); // Foreign key to link to the restaurant's table (provided by the restaurant admin)
            $table->date('reservation_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('reservant_name');
            $table->integer('number_of_participants');
            $table->unsignedBigInteger('table_structure_id'); // Foreign key to link to the table_structures table
            $table->timestamps();

            // Add foreign key constraints
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
            $table->foreign('table_structure_id')->references('id')->on('table_structures')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('table_reservations');
    }
}
