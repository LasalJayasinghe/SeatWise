<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Waitlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'selected_slot_id', 'selected_date', 'user_id'
    ];

    // Define the relationship with the TimeAvailability model
    public function selectedSlot()
    {
        return $this->belongsTo(TimeAvailability::class, 'selected_slot_id');
    }

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
