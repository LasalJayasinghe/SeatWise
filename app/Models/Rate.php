<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    protected $table = 'rate';

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurantID', 'id');
    }
}

