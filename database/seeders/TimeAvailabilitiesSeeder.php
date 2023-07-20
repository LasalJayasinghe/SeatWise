<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TimeAvailabilitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timeAvailabilities = [
            [
                'start_time' => '08:00:00',
                'end_time' => '12:00:00',
                'slot_date' => '2023-07-20',
                'availability' => 1, // Change this to 0 or 1 based on availability
                'hall_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more data here
        ];

        DB::table('time_availabilities')->insert($timeAvailabilities);
    }
}
