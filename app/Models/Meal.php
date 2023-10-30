<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'description', 'price', // Add more columns as needed
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
