<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hall extends Model
{
    use HasFactory;

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function timeAvailabilities(): HasMany
    {
        return $this->hasMany(TimeAvailability::class);
    }

    public function isSlotAvailable($slotDate, $startTime, $endTime)
    {
        return HallReservation::where('hall_id', $this->id)
            ->where('slot_date', $slotDate)
            ->where('start_time', '<', $endTime)
            ->where('end_time', '>', $startTime)
            ->count() === 0;
    }
}
