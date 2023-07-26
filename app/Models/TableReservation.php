<?php
// app/Models/TableReservation.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableReservation extends Model
{
    use HasFactory;

    protected $table = 'table_reservations';

    protected $fillable = [
        'restaurant_id',
        'reservation_date',
        'start_time',
        'end_time',
        'reservant_name',
        'number_of_participants',
        'table_structure_id',
    ];

        // Add the static method to fetch table structures based on user input
        public static function getTableStructures($restaurantId, $date, $startTime, $endTime, $numParticipants)
        {
            // Implement your logic to query the table structures based on the user input data
            // You may use Eloquent queries or raw SQL queries here to get the relevant data
            // For example:
            $tableStructures = TableReservation::where('restaurant_id', $restaurantId)
                ->where('reservation_date', $date)
                ->where('start_time', '<=', $startTime)
                ->where('end_time', '>=', $endTime)
                ->where('number_of_participants', '>=', $numParticipants)
                ->get();
    
            return $tableStructures;
        }
}
