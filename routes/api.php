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

Route::post('/login', [AuthController::class, 'login']);
Route::post('/restaurantlogin', [RestaurantController::class, 'restaurantlogin'])->name('restaurants.login');
Route::post('/cashierLogin', [RestaurantController::class, 'cashierLogin']);
Route::post('/addCashier', [RestaurantController::class, 'addCashier']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::get('/signup', [RestaurantController::class, 'getAllCategories']);
Route::get('/getAllCategories', [RestaurantController::class, 'getAllCategories']);
Route::post('/restaurantsignup', [RestaurantController::class, 'restaurantsignup']);
Route::post('/landing', [AuthController::class, 'landing']);

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/reslogout', [RestaurantController::class, 'logout']);
    Route::post('/cashierlogout', [RestaurantController::class, 'logout']);
    Route::apiResource('/users', UserController::class);

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

    // Hall routes
    Route::get('/restaurants/{restaurantId}/halls', [HallController::class, 'index']);
    Route::get('/halls/{id}', [HallController::class, 'show']);
    Route::get('/halls/{hallId}/time-availabilities/{selectedDate}', [HallController::class, 'fetchTimeAvailabilities']);

    // Additional routes for restaurant data
    Route::get('/restaurants/{restaurantId}/meals', [MealController::class, 'index']); // Fetch meals for a specific restaurant

    //TableForTwo routes
    Route::prefix('/tablefortwo')->group(function () {
        Route::get('/userdata', [AuthController::class, 'getUserData']);
        Route::get('/requests/{id}', [TablefortwoController::class, 'getRequests']);
        Route::get('/invitations/{id}', [TablefortwoController::class, 'getInvitations']);
        Route::get('/acceptedInvites/{id}', [TablefortwoController::class, 'getAcceptedInvites']);
        Route::get('/acceptedRequests/{id}', [TablefortwoController::class, 'getAcceptedRequests']);
        Route::get('/getHistory/{id}', [TablefortwoController::class, 'getHistoryRequests']);
        Route::get('/getPending/{id}', [TablefortwoController::class, 'getPendingRequests']);

    });


    //---------------------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------Restaurant Side Routes---------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------------------
    
    // Route::get('restaurants', [RestaurantController::class, 'show']);   - cause an error in customer side

    Route::post('/structure', [RestaurantController::class, 'addView'])->name('structure.addView');
    Route::post('/table', [RestaurantController::class, 'addTable']);
    Route::post('/setupprofile', [RestaurantController::class, 'setUpProfile']);
    Route::post('updateprofile', [RestaurantController::class, 'editRestaurant']);

    Route::get('/views', [RestaurantController::class, 'getViews']);
    Route::get('/gettable', [RestaurantController::class, 'getTable']);
    Route::get('/getreservedtable', [RestaurantController::class, 'getReservedTable']);
    Route::get('/profile', [RestaurantController::class, 'getProfile']);
    Route::get('/getsetupdata', [RestaurantController::class, 'getSetUpProfile']);
    Route::post('/handleCheckOut/{reservationId}',[RestaurantController::class, 'HandleCheckOut']);
    Route::post('/handleCheckIn/{reservationId}',[RestaurantController::class, 'HandleCheckIn']);

    Route::get('/getCashiers/{id}', [RestaurantController::class, 'getCashiers']);
    Route::get('/displayCashier/{cashierId}', [RestaurantController::class, 'displayCashier']);
    Route::get('/getReservations/{restaurant_id}', [RestaurantController::class, 'getReservations']);
    Route::get('/getStatus/{reservationId}', [RestaurantController::class, 'getStatus']);

    Route::get('/restaurants/{restaurant_id}', [RestaurantController::class, 'showRestaurantx']); // This route fetches a single restaurant by ID
    Route::get('/restaurants/{restaurant_id}/table-structures', [RestaurantController::class, 'getTableStructures']);
    Route::get('/restaurants/{restaurant_id}/available-tables', [RestaurantController::class, 'getAvailableTables']);
    Route::post('/updateCashier', [RestaurantController::class, 'updateCashier']);
    Route::post('/deleteEmployee/{cashierId}', [RestaurantController::class, 'deleteEmployee']);
    Route::get('/getCheckInCount/{restaurant_id}', [RestaurantController::class, 'getCheckInCount']);
    Route::get('/getCheckOutCount/{restaurant_id}', [RestaurantController::class, 'getCheckOutCount']);
    Route::get('/getReservationCount/{restaurant_id}', [RestaurantController::class, 'getReservationCount']);
    Route::get('/getRecentBookings/{restaurant_id}', [RestaurantController::class, 'getRecentBookings']);
    Route::post('/addmeal', [RestaurantController::class, 'addMeal']);
    Route::get('/getMenu/{id}', [RestaurantController::class, 'getMenu']);
    Route::post('/addcategory', [RestaurantController::class, 'addcategory']);
    Route::get('/getCategories/{id}', [RestaurantController::class, 'getCategories']);
    Route::get('/getTotalUserCount/{id}', [RestaurantController::class, 'totalUserCount']);
    Route::get('/getTotalMonthlyReservationCount/{id}', [RestaurantController::class, 'getTotalMonthlyReservationCount']);
    Route::post('/addTechincalAssistanceRequest', [RestaurantController::class, 'addTechincalAssistanceRequest']);
    Route::get('/restaurants/{restaurant_id}/halls', [HallController::class, 'index']);
    Route::get('/halls/{id}', [HallController::class, 'show']);
    Route::get('/halls/{hallId}/time-availabilities/{selectedDate}', [HallController::class, 'fetchTimeAvailabilities']);

    Route::get('/getOrder/{id}', [RestaurantController::class, 'getOrder']);
    Route::get('/getAllOrder/{id}', [RestaurantController::class, 'getAllOrder']);
    Route::get('/getReservationsByUser/{id}', [RestaurantController::class, 'getReservationsByUser']);
    Route::get('/getcustomer', [RestaurantController::class, 'getCustomer']);

    Route::get('/getfloor', [RestaurantController::class, 'getFloor']);

});


