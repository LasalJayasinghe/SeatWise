<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Restaurants;
use App\Models\User;
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



}