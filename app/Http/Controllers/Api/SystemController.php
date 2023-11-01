<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurants;
use App\Models\Restaurant;
use App\Models\User;
use App\Models\Rate;
use App\Models\Profits;
use Illuminate\Http\Request;
use Carbon\Carbon; // Import Carbon for working with dates and times

class SystemController extends Controller{

    public function getUserCount(){
        $userCount = User::count();

        return response()->json(['user_count' => $userCount]);
       //return response()->json($userCount);

    }

    public function getRestaurantCount(){
        $restaurantCount = Restaurants::count();

        return response()->json(['restaurant_count' => $restaurantCount]);
       

    }

    public function getRateCount(){
        $rateCount = Rate::count();
        $averageStarCount = Rate::avg('starCount');
        $averageStarCountFormatted = number_format($averageStarCount, 1, '.', '');


        return response()->json([
            'rate_count' => $rateCount,
            'avg_starCount' => $averageStarCountFormatted,
        ]);
       

    }


//     public function getProfitDataForGraph(Request $request)
// {
//     // Retrieve all records from the table
//     $profits = Profits::orderBy('date')->get();

//     // Initialize an array to store the data
//     $monthlyData = [];

//     if ($request->has('month')) {
//         $selectedMonth = $request->input('month');

//         // Filter data by the selected month
//         $selectedMonthProfits = $profits->filter(function ($profit) use ($selectedMonth) {
//             return Carbon::parse($profit->date)->format('Y-m') === $selectedMonth;
//         });

//         // Organize the data by weeks and calculate weekly profits
//         $weeksData = $selectedMonthProfits->groupBy(function ($profit) {
//             return Carbon::parse($profit->date)->format('W');
//         })->map(function ($weekProfits) {
//             return $weekProfits->sum('profit');
//         });

//         // Store the weekly profits for the selected month
//         $monthlyData[$selectedMonth] = $weeksData->toArray();
//     }

//     return response()->json($monthlyData);
// }

public function getWeeklyProfit()
{
    // Retrieve all records from the Profits model
    $profits = Profits::all();

    // Calculate the total weekly profit
    $weeklyProfit = $profits
        ->groupBy(function ($profit) {
            return Carbon::parse($profit->date)->format('W');
        })
        ->map(function ($weekProfits) {
            return $weekProfits->sum('profit');
        });

    // Sort the weekly profits in descending order and take the top 6
    $topWeeklyProfits = $weeklyProfit
        ->sortDesc()
        ->take(6);

    return response()->json(['top_weekly_profits' => $topWeeklyProfits]);
}


        public function getAllRestaurants()
        {
            // Use the Restaurants model to retrieve all data from the restaurants table
            $restaurants = Restaurants::with('profile')->get();

            // Return the retrieved data as a JSON response
            return response()->json($restaurants);
        }







}