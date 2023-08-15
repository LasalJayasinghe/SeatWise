<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Meal;
use App\Models\Restaurant;

class MealsSeeder extends Seeder
{
    public function run()
    {
        // Clear existing data (optional)
        Meal::truncate();

        // Get restaurant IDs
        $restaurantA = Restaurant::where('name', 'Restaurant A')->firstOrFail()->id;
        $restaurantB = Restaurant::where('name', 'Restaurant B')->firstOrFail()->id;
        $restaurantC = Restaurant::where('name', 'Restaurant C')->firstOrFail()->id;

        // Insert dummy data for meals
        for ($i = 1; $i <= 5; $i++) {
            Meal::create([
                'restaurant_id' => $restaurantA,
                'name' => "Meal A{$i}",
                'description' => "Delicious meal A{$i} at Restaurant A.",
                'price' => 10.99,
            ]);

            Meal::create([
                'restaurant_id' => $restaurantB,
                'name' => "Meal B{$i}",
                'description' => "Tasty meal B{$i} at Restaurant B.",
                'price' => 12.99,
            ]);

            Meal::create([
                'restaurant_id' => $restaurantC,
                'name' => "Meal C{$i}",
                'description' => "Exquisite meal C{$i} at Restaurant C.",
                'price' => 15.99,
            ]);
        }
    }
}


