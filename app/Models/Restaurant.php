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
    protected $fillable = ['name', 'description', 'image'];

    // Add any additional methods or relationships as needed

    // Define the relationship with Occasion model
    public function occasions()
    {
        return $this->hasMany(Occasion::class);
    }
}
