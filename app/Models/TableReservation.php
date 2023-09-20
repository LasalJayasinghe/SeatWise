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
        'tablefortwo',
        'status',
        'floor',
    ];
    

        public static function getAvailableTables($restaurantId, $date, $startTime, $endTime, $numParticipants)
    {
        $reservedTableIds = TableReservation::where('restaurant_id', $restaurantId)
            ->where('reservation_date', $date)
            ->where('start_time', '<=', $endTime)
            ->where('end_time', '>=', $startTime)
            ->pluck('table_structure_id')
            ->toArray();

            $availableTables = TableStructure::with('view') // Eager load the "view" relationship
            ->where('restaurant_id', $restaurantId)
            ->whereNotIn('id', $reservedTableIds)
            ->where('number_of_chairs', '>=', $numParticipants)
            ->get();

        return $availableTables;
    }
}
