<?php
namespace App\Http\Controllers\Api\customer;

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\TableReservation;
use Illuminate\Http\Request;

class TableReservationController extends Controller
{
    public function makeReservation(Request $request)
    {
        // Remove the validation rules
        // $validatedData = $request->validate([
        //     ...
        // ]);

        // Create a new TableReservation instance and fill it with the request data
        $reservation = new TableReservation();
        $reservation->fill($request->all());
        
        // Save the reservation to the database
        $reservation->save();

        // Optionally, you can return a response indicating success or failure
        return response()->json(['message' => 'Reservation created successfully'], 201);
    }
}
