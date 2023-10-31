<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\TableReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class TableReservationController extends Controller
{
    public function makeReservation(Request $request)
    {
        // Create a new TableReservation instance and fill it with the request data
        $reservation = new TableReservation();
        $reservation->fill($request->all());
        
        // Save the reservation to the database
        $reservation->save();

        // Optionally, you can return a response indicating success or failure
        return response()->json(['message' => 'Reservation created successfully'], 201);
    }

    public function getOngoingReservations()
{
    $userId = auth()->id(); 

    $ongoingReservations = TableReservation::where('reservant_ID', $userId)
        ->where('status', 2)
        ->get();

        Log::info($ongoingReservations); // Add this line for logging


    return response()->json($ongoingReservations);
}


public function getCompletedReservations()
{
    $userId = auth()->id(); 

    $completedReservations = TableReservation::where('reservant_ID', $userId)
        ->where('status', 0)
        ->get();

    return response()->json($completedReservations);
}

}