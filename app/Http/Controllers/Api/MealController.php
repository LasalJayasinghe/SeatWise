<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Meal;

class MealController extends Controller
{
    public function index($restaurantId)
    {
        // Fetch all meals
        $meals = Meal::where('restaurant_id', $restaurantId)->get();
    return response()->json($meals);
    }

    public function show($id)
{
    // Fetch a specific meal by ID and eager load the 'restaurant' relationship
    $meal = Meal::with('category', 'restaurant')->findOrFail($id);
    return response()->json($meal);
}


}
