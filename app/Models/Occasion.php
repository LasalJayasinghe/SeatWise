<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Occasion extends Model
{
    use HasFactory;

    // Define the relationship with Restaurant model
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
