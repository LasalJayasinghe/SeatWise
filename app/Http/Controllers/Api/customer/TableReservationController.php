<?php
namespace App\Http\Controllers\Api\customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TableReservation;

class TableReservationController extends Controller
{
    public function reserveTable(Request $request)
    {
        // Validate the incoming reservation data
        $validatedData = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'reservation_date' => 'required|date',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
            'reservant_ID' => 'required|exists:users,id',
            'number_of_participants' => 'required|integer|min:1',
            'table_structure_id' => 'required|exists:table_structures,id',
            'tablefortwo' => 'required|boolean',
            'floor' => 'required|integer|min:1',
            'status' => 'required|integer', // Adjust validation rules as needed
        ]);
    
        // Create a new reservation record
        $reservation = TableReservation::create($validatedData);
    
        return response()->json(['message' => 'Reservation successful', 'reservation' => $reservation], 201);
    }
    
    
    }
    
    
