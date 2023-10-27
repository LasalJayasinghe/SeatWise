<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'restaurants';

    // Define the fillable attributes (if applicable)
    protected $fillable = ['restaurantname', 'description','image'];

    public function profile()
{
    return $this->hasOne(Profile::class);
}

public function rates()
{
    return $this->hasMany(Rate::class, 'restaurantID', 'id');
}

}

