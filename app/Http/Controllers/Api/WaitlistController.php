<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Waitlist; // Make sure to import the Waitlist model

class WaitlistController extends Controller
{
    public function store(Request $request)
    {
        // Validate the form data (you can add more validation rules as needed)
        $validatedData = $request->validate([
            'username' => 'required|string',
            'email' => 'required|email',
            'selectedDate' => 'required|date',
            'selectedSlot' => 'required|array',
        ]);

        // Create a new Waitlist entry in the database
        $waitlist = Waitlist::create([
            'name' => $validatedData['username'],
            'email' => $validatedData['email'],
            'selected_date' => $validatedData['selectedDate'],
            'selected_slot_id' => $validatedData['selectedSlot']['id'],
            'user_id' => auth()->id(), // Assuming the authenticated user's ID is stored in the 'id' column of the 'users' table
        ]);

        // Return a response indicating success
        return response()->json(['message' => 'Waitlist data saved successfully'], 200);
    }
}
