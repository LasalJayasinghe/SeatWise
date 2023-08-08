<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableStructureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Structure for Restaurant A
        $this->createStructure('Restaurant A', 3, 6);

        // Structure for Restaurant B
        $this->createStructure('Restaurant B', 2, 4);

        // Structure for Restaurant C
        $this->createStructure('Restaurant C', 4, 3);
    }

    /**
     * Create the table structures for a restaurant.
     *
     * @param string $restaurantName
     * @param int $rows
     * @param int $tablesInEachRow
     * @return void
     */
    private function createStructure($restaurantName, $rows, $tablesInEachRow)
    {
        $restaurant = DB::table('restaurants')->where('name', $restaurantName)->first();

        if (!$restaurant) {
            $this->command->error("Restaurant '{$restaurantName}' not found in the 'restaurants' table. Skipping...");
            return;
        }

        for ($row = 1; $row <= $rows; $row++) {
            for ($table = 1; $table <= $tablesInEachRow; $table++) {
                DB::table('table_structures')->insert([
                    'restaurant_id' => $restaurant->id,
                    'table_number' => "Table {$row}-{$table}",
                    'number_of_chairs' => 4, // Assuming each table has 4 chairs
                    'view' => 'Sea View', // Default view for demonstration purposes
                    'posX' => $row,
                    'posY' => $table,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $this->command->info("Table structures for '{$restaurantName}' have been seeded.");
    }
}
