<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableReservationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get all the restaurants
        $restaurants = DB::table('restaurants')->get();

        // Loop through each restaurant and create reservations
        foreach ($restaurants as $restaurant) {
            $restaurantId = $restaurant->id;
            $tableStructures = DB::table('table_structures')->where('restaurant_id', $restaurantId)->get();

            // Loop through each table structure and create reservations
            foreach ($tableStructures as $tableStructure) {
                $tableStructureId = $tableStructure->id;
                $reservantName = $this->generateRandomName();
                $reservationDate = now()->addDays(rand(0, 30));
                $startTime = $this->generateRandomTime();
                $endTime = $this->calculateEndTime($startTime);

                // Check if the table is available for the given time slot
                $isAvailable = $this->isTableAvailable($restaurantId, $tableStructureId, $reservationDate, $startTime, $endTime);

                if ($isAvailable) {
                    DB::table('table_reservations')->insert([
                        'restaurant_id' => $restaurantId,
                        'table_structure_id' => $tableStructureId,
                        'reservation_date' => $reservationDate,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'reservant_name' => $reservantName,
                        'number_of_participants' => rand(1, 4), // Assuming a reservation can have up to 4 participants
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }

    /**
     * Generate a random name for the reservant.
     *
     * @return string
     */
    private function generateRandomName()
    {
        $names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown', 'David Lee', 'Sarah Wilson'];
        return $names[array_rand($names)];
    }

    /**
     * Generate a random time for the reservation.
     *
     * @return string
     */
    private function generateRandomTime()
    {
        $hours = rand(10, 20); // Generate a random hour between 10 and 20 (10 AM to 8 PM)
        $minutes = rand(0, 3) * 15; // Generate 0, 15, 30, or 45 minutes
        return sprintf('%02d:%02d', $hours, $minutes);
    }

    /**
     * Calculate the end time based on the start time and duration.
     *
     * @param string $startTime
     * @return string
     */
    private function calculateEndTime($startTime)
    {
        $endTime = date('H:i', strtotime($startTime) + 60 * 60); // Add 1 hour to the start time
        return $endTime;
    }

    /**
     * Check if the table is available for the given time slot.
     *
     * @param int $restaurantId
     * @param int $tableStructureId
     * @param string $reservationDate
     * @param string $startTime
     * @param string $endTime
     * @return bool
     */
    private function isTableAvailable($restaurantId, $tableStructureId, $reservationDate, $startTime, $endTime)
    {
        $existingReservations = DB::table('table_reservations')
            ->where('restaurant_id', $restaurantId)
            ->where('table_structure_id', $tableStructureId)
            ->where('reservation_date', $reservationDate)
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime, $endTime])
                    ->orWhereBetween('end_time', [$startTime, $endTime])
                    ->orWhere(function ($query) use ($startTime, $endTime) {
                        $query->where('start_time', '<', $startTime)
                            ->where('end_time', '>', $endTime);
                    });
            })
            ->exists();

        return !$existingReservations;
    }
}
