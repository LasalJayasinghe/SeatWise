<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InsertSampleRestaurants extends Migration
{
    public function up()
    {
        DB::table('restaurants')->insert([
            [
                'name' => 'Restaurant 1',
                'description' => 'This is Restaurant 1',
            ],
            [
                'name' => 'Restaurant 2',
                'description' => 'This is Restaurant 2',
            ],
            // Add more sample restaurant data if needed
        ]);
    }

    public function down()
    {
        // You can implement the down() method if needed
    }
}

