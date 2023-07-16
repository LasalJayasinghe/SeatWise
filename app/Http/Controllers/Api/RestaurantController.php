<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::all();

        return response()->json($restaurants);
    }

    public function show(Request $request, $id)
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        return response()->json($restaurant);
    }

    public function occasions($id)
    {
        // Find the specific restaurant
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        // Get the occasions for the restaurant
        $occasions = $restaurant->occasions;

        return response()->json($occasions);
    }
}
