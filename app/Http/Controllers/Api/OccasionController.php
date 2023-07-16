<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Occasion;
use Illuminate\Http\Request;

class OccasionController extends Controller
{
    public function index($restaurantId)
    {
        $occasions = Occasion::where('restaurant_id', $restaurantId)->get();

        return response()->json($occasions);
    }
}
