<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TableReservation;

class TableReservationController extends Controller
{
    public function reserveTables(Request $request)
    {
        // Extract the reservation data from the request
        $selectedTables = $request->input('selectedTables');
        $date = $request->input('date');
        $startTime = $request->input('start_time');
        $endTime = $request->input('end_time');
        $reservantName = $request->input('reservant_name');
        $numberOfParticipants = $request->input('number_of_participants');
        $tablefortwo = $request->input('tablefortwo');
        $restaurantId = $request->input('restaurant_id'); // Fetch restaurant_id directly


        // Create a new reservation entry
        $reservation = new TableReservation([
            'restaurant_id' => $restaurantId,
            'reservation_date' => $date,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'reservant_name' => $reservantName,
            'number_of_participants' => $numberOfParticipants,
            'table_structure_id' => $selectedTables[0]['id'], // Assuming id is in the selectedTables array
            'tablefortwo' => $tablefortwo,
        ]);

        $reservation->save();

        return response()->json(['message' => 'Reservation successful']);
    }
}
