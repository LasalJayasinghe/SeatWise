<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\HallController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WaitlistController;
use App\Http\Controllers\Api\MealController;
use App\Http\Controllers\Api\AllMealsController;
use App\Http\Controllers\Api\TablefortwoController;
use App\Http\Controllers\Api\TableReservationController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

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

    // Meal routes
    Route::get('/meals', [MealController::class, 'index'])->name('meals.index');
    Route::get('/meals/{id}', [MealController::class, 'show']);

    Route::get('/all-meals', [AllMealsController::class, 'index']);

    // Waitlist
    Route::post('/waitlist', [WaitlistController::class, 'store']);

    Route::post('/reserve-tables', [TableReservationController::class, 'reserveTables']);

    // Restaurant routes
    Route::get('/restaurants', [RestaurantController::class, 'index']); // Fetch all restaurants
    Route::get('/restaurants/{id}', [RestaurantController::class, 'show']); // Fetch a single restaurant by ID
    Route::get('/restaurants/{id}/table-structures', [RestaurantController::class, 'getTableStructures']);
    Route::get('/restaurants/{id}/available-tables', [RestaurantController::class, 'getAvailableTables']);


    // Hall routes
    Route::get('/restaurants/{restaurantId}/halls', [HallController::class, 'index']);
    Route::get('/halls/{id}', [HallController::class, 'show']);
    Route::get('/halls/{hallId}/time-availabilities/{selectedDate}', [HallController::class, 'fetchTimeAvailabilities']);
});

// Additional routes for restaurant data
Route::get('/restaurants/{restaurantId}/meals', [MealController::class, 'index']); // Fetch meals for a specific restaurant
