<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class TablefortwoController extends Controller
{
    public function index()
    {
        // $restaurants = Restaurant::all();

        // return response()->json($restaurants);
    }

    // public function show(Request $request, $id)
    // {
    //     $restaurant = Restaurant::find($id);

    //     if (!$restaurant) {
    //         return response()->json(['message' => 'Restaurant not found'], 404);
    //     }

    //     return response()->json($restaurant);
    // }
}
