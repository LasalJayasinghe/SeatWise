<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tablefortwo extends Model
{
    use HasFactory;

    protected $table = 'tablefortwo';

    protected $fillable = [
        'reservationNUmber',
        'acceptedID',
        'status',
        'created_at',
        'updated_at',
    ];

    public function reservation()
    {
        return $this->belongsTo(TableReservation::class, 'reservationNumber', 'reservationNumber');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'acceptedID');
    }
}
