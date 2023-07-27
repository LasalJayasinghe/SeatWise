<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RestaurantController; // Import the RestaurantController
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HallController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WaitlistController;


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

// Existing authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);

});
Route::middleware('auth:sanctum')->post('/waitlist', [WaitlistController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUserData']);


// Additional routes for restaurant data
Route::get('/restaurants', [RestaurantController::class, 'index']); // This route fetches all restaurants
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']); // This route fetches a single restaurant by ID
Route::get('/restaurants/{id}/table-structures', [RestaurantController::class, 'getTableStructures']);

Route::get('/restaurants/{restaurantId}/halls', [HallController::class, 'index']);
Route::get('/halls/{id}', [HallController::class, 'show']);

Route::get('/halls/{hallId}/time-availabilities/{selectedDate}', [HallController::class, 'fetchTimeAvailabilities']);

// Authentication routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/landing', [AuthController::class, 'landing']);
