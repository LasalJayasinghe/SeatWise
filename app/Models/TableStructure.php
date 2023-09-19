<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableStructure extends Model
{
    use HasFactory;

    protected $table = 'table_structures';

    protected $fillable = [
        'restaurant_id',
        'table_number',
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


