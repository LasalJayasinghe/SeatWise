<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

<<<<<<< Updated upstream
return new class extends Migration
=======
class CreateRestaurantsTable extends Migration
>>>>>>> Stashed changes
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
<<<<<<< Updated upstream
=======
            $table->string('name');
            $table->text('description');
            // Add any additional columns you need for the restaurants table

>>>>>>> Stashed changes
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
        Schema::dropIfExists('restaurants');
    }
<<<<<<< Updated upstream
};
=======
}
>>>>>>> Stashed changes
