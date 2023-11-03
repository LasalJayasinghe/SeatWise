<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MealReservation;
use App\Models\TableReservation;

class MealReservationController extends Controller
{
    public function store(Request $request)
{
    $data = $request->validate([
        'mealIDs' => 'required',
        'amount' => 'required',
        'size' => 'required',
        'instructions' => 'required',
        'restaurantID' => 'required',
    ]);

    $mealReservation = MealReservation::create($data);

    return response()->json(['message' => 'Meal reservation created successfully']);
}
}
