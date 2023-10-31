<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\TableReservation;
use Illuminate\Http\Request;

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
    $userId = auth()->id(); // Assuming you are using Laravel's built-in authentication

    $ongoingReservations = TableReservation::where('reservant_ID', $userId)
        ->where('status', 2)
        ->get();

    return response()->json($ongoingReservations);
}


    public function getCompletedReservations()
{
    $completedReservations = TableReservation::where('status', 0)->get();
    return response()->json($completedReservations);
}

}