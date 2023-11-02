<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    protected $table = 'rate';

    protected $fillable = [
        'starCount',
        'customerID',
        'restaurantID',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurantID', 'id');
    }
}

