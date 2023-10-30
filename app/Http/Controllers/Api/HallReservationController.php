<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HallReservation;

class HallReservationController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all(); // Get all the data from the request

        // Create a new HallReservation model instance
        $reservation = new HallReservation;

        // Assuming you have a logged-in user, you can get the user ID like this:
        $userId = 1;

        // Fill the model with data
$reservation->user_id = $userId;
$reservation->reservant_name = $data['reservantName'];
$reservation->email_address = $data['emailAddress'];
$reservation->contact_number = $data['contactNumber'];
$reservation->Occasion_type = $data['occasionType'];
$reservation->Description = $data['description'];

if (isset($data['selectedSlot'])) {
    $reservation->Slot_id = $data['selectedSlot']['id'];
    $reservation->hall_id = $data['selectedSlot']['hall_id'];
    $reservation->slot_date = $data['selectedDate'];
    $reservation->start_time = $data['selectedSlot']['start_time'];
    $reservation->end_time = $data['selectedSlot']['end_time'];
}

// Save the reservation to the database
$reservation->save();

// Return a success response
return response()->json(['message' => 'Reservation successful']);

    }
}
