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
        return $this->hasMany(TableReservation::class, 'reservationNumber', 'reservationNumber');
    }

}
