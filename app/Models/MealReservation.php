<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealReservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'mealIDs', 'amount', 'size', 'instructions', 'restaurantID', 'table_reservationID'
    ];
}
