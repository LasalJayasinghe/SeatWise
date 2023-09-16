<?php
namespace App\Http\Controllers\Api\restaurant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Waitlist; // Make sure to import the Waitlist model



class WaitlistController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|string',
            'email' => 'required|email',
            'selectedSlot.id' => 'required|numeric',
            'selectedSlot.start_time' => 'required|string',
            'selectedSlot.end_time' => 'required|string',
            'selectedSlot.availability' => 'required|boolean',
        ]);
    
        // Extract the relevant data from the validated request
        $username = $data['username'];
        $email = $data['email'];
        $selectedSlotId = $data['selectedSlot']['id'];
    
        // Now you can insert the data into the database without the selected_date field
        $waitlist = Waitlist::create([
            'name' => $username,
            'email' => $email,
            'selected_slot_id' => $selectedSlotId,
            'user_id' => auth()->user()->id, // Assuming you have an authenticated user
        ]);
    
        return response()->json(['message' => 'Successfully added to the waitlist'], 201);
    }
    
}
