<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hall;
use App\Models\HallSlot;
use App\Models\HallReservation;
use Carbon\Carbon;

class HallController extends Controller
{
    public function index($restaurantId)
    {
        $halls = Hall::where('restaurant_id', $restaurantId)->get();
        return response()->json($halls);
    }

    public function show($id)
    {
        $hall = Hall::findOrFail($id);
        return response()->json($hall);
    }

    public function fetchTimeSlots($hallId, $selectedDate)
    {
        $date = Carbon::parse($selectedDate);

        $slots = HallSlot::where('hall_id', $hallId)
            ->where('slot_date', $date->toDateString())
            ->get();

        $timeSlots = $slots->map(function ($slot) use ($date, $hallId) {
            return [
                'id' => $slot->id, // Include the slot ID
                'hall_id' => $hallId, // Include the hall ID
                'start_time' => $slot->start_time,
                'end_time' => $slot->end_time,
                'availability' => Hall::find($hallId)->isSlotAvailable(
                    $date->toDateString(),
                    $slot->start_time,
                    $slot->end_time
                ),
            ];
        });

        return response()->json($timeSlots);
    }

    public function checkSlotAvailability($slot, $selectedDate, $hallId)
    {
        $reservation = HallReservation::where('Slot_id', $slot->id)
            ->where('slot_date', $selectedDate)
            ->where('hall_id', $hallId)
            ->first();

        return $reservation ? false : true;
    }

    // Other methods such as create, update, or delete can be included as needed.
}
