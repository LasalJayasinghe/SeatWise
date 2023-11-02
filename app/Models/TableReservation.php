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
        'reservant_ID',
        'reservationNumber',
        'table_number',
        'restaurant_id',
        'reservation_date',
        'start_time',
        'end_time',
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

    public function tablefortwo()
    {
        // return $this->hasMany(Tablefortwo::class, 'reservationNumber', 'reservationNumber');
        return $this->belongsTo(Tablefortwo::class, 'reservationNumber', 'reservationNumber');

    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function user()
    {
        
        return $this->belongsTo(User::class, TableforTwo::class,'acceptedID');
        }


        public static function getOngoingReservations()
    {
        return TableReservation::where('status', 2)->get();
    }

    public static function getCompletedReservations()
    {
        return TableReservation::where('status', 0)->get();
    }

}
