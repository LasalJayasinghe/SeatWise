<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TableStructure extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'restaurant_id',
        'table_id',
        'table_number',
        'floor',
        'number_of_chairs',
        'view',
        'posX',
        'posY',
    ];

    public function view()
{
    return $this->belongsTo(View::class, 'view');
}


    // Add the relationship with TableReservation
    public function reservation()
    {
        return $this->hasOne(TableReservation::class, 'table_structure_id');
    }
}


