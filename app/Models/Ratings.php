<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class   Ratings extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'rate';

    protected $fillable = [
        'rateID',
        'starCount',
        'CustomerID',
        'restaurantID',
    ];

   

   
}
