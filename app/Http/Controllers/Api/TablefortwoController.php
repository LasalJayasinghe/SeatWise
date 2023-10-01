<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon; // Import Carbon for working with dates and times
use App\Models\Tablefortwo;
use App\Models\TableReservation;
use App\Models\Restaurants;
use App\Models\User;

class TablefortwoController extends Controller
{
    public function getRequests($id)
    {
        $reservations = TableReservation::where('reservant_ID', $id)->get();
        return response()->json($reservations);
    }

    public function getInvitations($id)
    {
        $oneHourAhead = Carbon::now()->addHour();
        $currentDate = Carbon::now()->toDateString();

        // Retrieve reservations that meet the specified criteria
        $reservations = TableReservation::where(function ($query) use ($id, $currentDate, $oneHourAhead) {
            $query->where('reservant_ID', '!=', $id)
                ->where('tablefortwo', 1)
                ->where(function ($query) use ($currentDate, $oneHourAhead) {
                    $query->where('reservation_date', '>', $currentDate)
                          ->orWhere(function ($query) use ($currentDate, $oneHourAhead) {
                              $query->where('reservation_date', '=', $currentDate)
                                    ->where('start_time', '>', $oneHourAhead);
                          });
                });
        })
        ->get();
        return response()->json($reservations);
    }

    public function getAcceptedInvites($id)
    {
        $acceptedInvites = TableForTwo::where('acceptedID', $id)
        ->with('reservation') // Eager load the reservation relationship
        ->get();
        
        
        return response()->json($acceptedInvites);
    }

    public function getAcceptedRequests($id)
    {
        $requests = TableReservation::where('reservant_ID', $id)
        ->where('tablefortwo', 1)
        ->whereHas('tablefortwo', function ($query) {
            $query->where('status', 'accepted');
        })
        ->get();

        return response()->json($requests);
    }

    
    public function getPendingRequests($id)
    {
        $requests = TableReservation::where('reservant_ID', $id)
        ->where('tablefortwo', 1)
        ->whereHas('tablefortwo', function ($query) {
            $query->where('status', 'pending');
        })
        ->get();

        return response()->json($requests);
    }
    
    public function getHistoryRequests($id)
    {
        $requests = TableReservation::where('reservant_ID', $id)
            ->where('tablefortwo', 1)
            ->whereHas('tablefortwo.user', function ($query) {
                $query->whereColumn('acceptedID', 'users.id') 
                      ->where('status', 'completed')
                      ->orWhere('status', 'rejected');
            })
            ->with(['restaurant' , 'tablefortwo'])
            ->get();
    
        return response()->json($requests);
    }

    public function getHistoryAcceptedRequests($id)
    {
        $statuses = ['completed', 'rejected'];
    
        $Invites = TableForTwo::where('acceptedID', $id)
            ->whereIn('status', $statuses)
            ->with('reservation') // Eager load the reservation relationship
            ->get();
    
        return response()->json($Invites);
    }

}
