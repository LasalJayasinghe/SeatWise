<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HallReservation extends Model
{
    use HasFactory;

    protected $table = 'hall_reservations';

    protected $fillable = [
        'user_id',
        'reservant_name',
        'email_address',
        'contact_number',
        'Occasion_type',
        'Description',
        'Slot_id',
        'Transaction_status',
    ];
}
