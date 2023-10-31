<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HallReservations extends Model
{
    use HasFactory;

    protected $table = 'advertisements';

    protected $fillable = [
        'id',
        'user_id',
        'reservant_name',
        'email_address',
        'contact_number',
        'Occasion type',
        'Description',
        'Slot_id',
        'hall_id',
        'slot_date',
        'start_time',
        'end_time',
        'Transaction_status',
    ];

}
