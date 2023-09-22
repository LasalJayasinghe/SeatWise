<?php
namespace App\Http\Controllers\Api\customer;

use App\Http\Controllers\Controller;
use App\Models\TableReservation;
use Illuminate\Http\Request;

class TableReservationController extends Controller
{
    public function makeReservation(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'reservationNumber' => 'required|string',
            'table_number' => 'required|string',
            'restaurant_id' => 'required|integer',
            'reservation_date' => 'required|date',
            'start_time' => 'required|time',
            'end_time' => 'required|time',
            'reservant_ID' => 'required|integer',
            'number_of_participants' => 'required|integer',
            'table_structure_id' => 'required|integer',
            'tablefortwo' => 'required|boolean', // Assuming it's a checkbox with a boolean value
            'status' => 'integer',
            'floor' => 'integer',
        ]);

        // Create a new TableReservation instance and fill it with validated data
        $reservation = new TableReservation();
        $reservation->fill($validatedData);
        
        // Save the reservation to the database
        $reservation->save();

        // Optionally, you can return a response indicating success or failure
        return response()->json(['message' => 'Reservation created successfully'], 201);
    }
}

    
    
