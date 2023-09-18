<?php
namespace App\Http\Controllers\Api\customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Meal;

class AllMealsController extends Controller
{
    public function index()
    {
        // Fetch all meals from all restaurants
        $allMeals = Meal::all();
        return response()->json($allMeals);
    }
}