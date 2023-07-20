<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HallsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('halls')->insert([
            // For Restaurant A
            [
                'name' => 'Hall A1',
                'description' => 'A spacious hall with elegant decor for events.',
                'pictures' => 'hall_a1.jpg', // Replace with actual image URLs if available
                'restaurant_id' => 1, // The ID of Restaurant A
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add other halls data for Restaurant A

            // For Restaurant B
            [
                'name' => 'Hall B1',
                'description' => 'An intimate hall with rustic charm.',
                'pictures' => 'hall_b1.jpg', // Replace with actual image URLs if available
                'restaurant_id' => 2, // The ID of Restaurant B
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add other halls data for Restaurant B

            // For Restaurant C
            [
                'name' => 'Hall C1',
                'description' => 'A modern hall with state-of-the-art facilities.',
                'pictures' => 'hall_c1.jpg', // Replace with actual image URLs if available
                'restaurant_id' => 3, // The ID of Restaurant C
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add other halls data for Restaurant C
        ]);
    }
}
