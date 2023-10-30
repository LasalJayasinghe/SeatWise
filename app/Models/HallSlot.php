<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HallSlot extends Model
{
    use HasFactory;

    protected $table = 'halls_slots';

    protected $fillable = [
        'start_time',
        'end_time',
        'slot_date',
        'hall_id',
    ];

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
}
