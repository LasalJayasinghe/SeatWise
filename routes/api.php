<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\customer\AuthController;
use App\Http\Controllers\Api\customer\RestaurantController;
use App\Http\Controllers\Api\customer\HallController;
use App\Http\Controllers\Api\customer\UserController;
use App\Http\Controllers\Api\customer\WaitlistController;
use App\Http\Controllers\Api\customer\MealController;
use App\Http\Controllers\Api\customer\AllMealsController;
use App\Http\Controllers\Api\customer\TableReservationController;
use App\Http\Controllers\Api\customer\TablefortwoController;


// Authentication routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/landing', [AuthController::class, 'landing']);



// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
    Route::get('/user-data', [AuthController::class, 'getUserData'])->name('user-data');

    // Meal routes
    Route::get('/meals', [MealController::class, 'index'])->name('meals.index');
    Route::get('/meals/{id}', [MealController::class, 'show']);

    Route::get('/all-meals', [AllMealsController::class, 'index']);

    // Waitlist
    Route::post('/waitlist', [WaitlistController::class, 'store']);

    // Restaurant routes
    Route::get('/restaurants', [RestaurantController::class, 'index']); // Fetch all restaurants
    Route::get('/restaurants/{id}', [RestaurantController::class, 'show']); // Fetch a single restaurant by ID
    Route::get('/restaurants/{id}/table-structures', [RestaurantController::class, 'getTableStructures']);
    Route::get('/restaurants/{id}/available-tables', [RestaurantController::class, 'getAvailableTables']);

    Route::post('/make-reservation', [TableReservationController::class, 'makeReservation']);

    // Hall routes
    Route::get('/restaurants/{restaurantId}/halls', [HallController::class, 'index']);
    Route::get('/halls/{id}', [HallController::class, 'show']);
    Route::get('/halls/{hallId}/time-availabilities/{selectedDate}', [HallController::class, 'fetchTimeAvailabilities']);
});

// Additional routes for restaurant data
Route::get('/restaurants/{restaurantId}/meals', [MealController::class, 'index']); // Fetch meals for a specific restaurant
