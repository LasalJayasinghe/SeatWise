<?php

namespace App\Http\Controllers\Api\customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hall;
use App\Models\TimeAvailability;
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

    public function fetchTimeAvailabilities($hallId, $selectedDate)
    {
        $date = Carbon::parse($selectedDate);
        
        $timeAvailabilities = TimeAvailability::where('hall_id', $hallId)
            ->where('slot_date', $date->toDateString())
            ->get();

        return response()->json($timeAvailabilities);
    }
}
