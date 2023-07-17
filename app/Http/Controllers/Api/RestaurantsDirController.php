<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    public function suggestions()
    {
        // Fetch restaurant suggestions from the database
        $suggestions = Restaurant::orderBy('name')->take(5)->get();

        // Return the suggestions as JSON
        return response()->json($suggestions);
    }

    public function search(Request $request)
    {
        // Get the search query from the request
        $query = $request->input('query');

        // Perform the search in the database
        $results = Restaurant::where('name', 'like', "%$query%")->get();

        // Return the search results as JSON
        return response()->json($results);
    }
}
