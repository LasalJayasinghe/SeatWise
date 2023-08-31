<?php

namespace App\Http\Controllers\Api\customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\TableReservation;
use App\Models\TableStructure;


class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $area = $request->query('area');

        $query = Restaurant::query();

        if ($area) {
            $query->where('area', $area);
        }

        $restaurants = $query->get();

        return response()->json($restaurants);
    }

    public function show($id)
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        return response()->json($restaurant);
    }

    public function getTableStructures($id)
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        // Fetch the table structures associated with the restaurant
        $tableStructures = TableStructure::where('restaurant_id', $id)->get();

        // Return the fetched table structures as a JSON response
        return response()->json($tableStructures);
}

public function getAvailableTables(Request $request, $restaurantId)
{
    $date = $request->input('date');
    $startTime = $request->input('start_time');
    $endTime = $request->input('end_time');
    $numParticipants = $request->input('num_participants');

    $tableStructures = TableStructure::where('restaurant_id', $restaurantId)->get();
    $reservedTableIds = TableReservation::where('restaurant_id', $restaurantId)
        ->where('reservation_date', $date)
        ->where('start_time', '<=', $endTime)
        ->where('end_time', '>=', $startTime)
        ->pluck('table_structure_id')
        ->toArray();

        foreach ($tableStructures as $table) {
            $table->isAvailable = !in_array($table->id, $reservedTableIds) && $table->number_of_chairs >= $numParticipants;
            
            // Check if the table is unavailable but has the tablefortwo option enabled
            $tableReservation = TableReservation::where('restaurant_id', $restaurantId)
                ->where('reservation_date', $date)
                ->where('start_time', '<=', $endTime)
                ->where('end_time', '>=', $startTime)
                ->where('table_structure_id', $table->id)
                ->first();
            
            $table->isTableForTwo = !$table->isAvailable && $tableReservation && $tableReservation->tablefortwo == 1;
        }               

        
    return response()->json($tableStructures);
}

}

