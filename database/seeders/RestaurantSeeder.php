<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;

class RestaurantSeeder extends Seeder
{
    public function run()
    {
        // Clear existing data (optional)
        Restaurant::truncate();

        // Insert dummy data
        Restaurant::create([
            'name' => 'Restaurant A',
            'description' => 'A lovely place to enjoy your favorite meals.',
        ]);

        Restaurant::create([
            'name' => 'Restaurant B',
            'description' => 'Discover new flavors and dishes in a cozy ambiance.',
        ]);

        Restaurant::create([
            'name' => 'Restaurant C',
            'description' => 'Experience a fusion of tastes from around the world.',
        ]);
    }
}
