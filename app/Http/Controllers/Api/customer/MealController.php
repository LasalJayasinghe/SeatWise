<?php

namespace App\Http\Controllers\Api\customer;

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
        // Fetch a specific meal by ID
        $meal = Meal::findOrFail($id);
        return response()->json($meal);
    }

}
