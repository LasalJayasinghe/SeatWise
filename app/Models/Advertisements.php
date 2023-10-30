<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Advertisements extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'advertisements';

    protected $fillable = [
        'restaurant_id',
        'price',
        'photo',
        'duration',
    ];

    // Define the relationship with the Restaurant model
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    // Define any other relationships or methods specific to the View model if needed
}
