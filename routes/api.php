<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\cp;
use App\Http\Controllers\Api\HallController;



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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout' , [AuthController::class , 'logout']);
    Route::post('/reslogout', [RestaurantController::class, 'logout']);
    Route::post('/cashierlogout', [RestaurantController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
});
 
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::middleware(['auth:restaurant'])->group(function () {
//     Route::get('/restaurant', function (Request $request) {
//         // Redirect the user to the restaurant-specific area
//         return response()->json(['message' => 'Restaurant area']);
//     });
//     Route::post('/reslogout', [RestaurantController::class, 'logout']);
// });

Route::post('/landing' , [AuthController::class , 'landing']);
Route::post('/signup' , [AuthController::class , 'signup']);
Route::post('/login' , [AuthController::class , 'login']);

Route::post('/restaurantsignup', [RestaurantController::class, 'restaurantsignup']);

Route::get('restaurants', [RestaurantController::class, 'show']);
//Route::get('cashiers', [RestaurantController::class, 'cashierLogin']);
// Route::get('cashiers', [RestaurantController::class, 'cashiershow']);

Route::post('/restaurantlogin', [RestaurantController::class, 'restaurantlogin'])->name('restaurants.login');
Route::post('/cashierLogin', [RestaurantController::class, 'cashierLogin']);
Route::post('/addCashier', [RestaurantController::class, 'addCashier']);

Route::post('/structure', [RestaurantController::class, 'addView'])->name('structure.addView');
Route::post('/table', [RestaurantController::class, 'addTable']);
Route::post('/setupprofile', [RestaurantController::class, 'setUpProfile']);
Route::post('updateprofile', [RestaurantController::class, 'editRestaurant']);
// Route::post('/editprofile', [RestaurantController::class, 'editRestaurant']);

Route::get('/views', [RestaurantController::class, 'getViews']);
Route::get('/gettable', [RestaurantController::class, 'getTable']);
Route::get('/getreservedtable', [RestaurantController::class, 'getReservedTable']);
Route::get('/profile', [RestaurantController::class, 'getProfile']);
Route::get('/getsetupdata', [RestaurantController::class, 'getSetUpProfile']);
Route::post('/handleCheckOut/{reservationId}',[RestaurantController::class, 'HandleCheckOut']);
Route::post('/handleCheckIn/{reservationId}',[RestaurantController::class, 'HandleCheckIn']);

// Route::middleware('auth:api')->get('/views', [RestaurantController::class, 'getViews']);
Route::get('/getCashiers/{id}', [RestaurantController::class, 'getCashiers']);
Route::get('/displayCashier/{cashierId}', [RestaurantController::class, 'displayCashier']);
Route::get('/getReservations/{restaurant_id}', [RestaurantController::class, 'getReservations']);
Route::get('/getStatus/{reservationId}', [RestaurantController::class, 'getStatus']);
//Route::get('/restaurants/{id}', [RestaurantController::class, 'showRestaurant']); // This route fetches a single restaurant by ID
Route::get('/restaurants/{restaurant_id}', [RestaurantController::class, 'showRestaurantx']); // This route fetches a single restaurant by ID
Route::get('/restaurants/{restaurant_id}/table-structures', [RestaurantController::class, 'getTableStructures']);
Route::get('/restaurants/{restaurant_id}/available-tables', [RestaurantController::class, 'getAvailableTables']);
Route::post('/updateCashier', [RestaurantController::class, 'updateCashier']);
Route::post('/deleteEmployee/{cashierId}', [RestaurantController::class, 'deleteEmployee']);
Route::get('/getCheckInCount/{restaurant_id}', [RestaurantController::class, 'getCheckInCount']);
Route::get('/getCheckOutCount/{restaurant_id}', [RestaurantController::class, 'getCheckOutCount']);
Route::get('/getReservationCount/{restaurant_id}', [RestaurantController::class, 'getReservationCount']);
Route::get('/getRecentBookings/{restaurant_id}', [RestaurantController::class, 'getRecentBookings']);
// Remove the existing '/user' route that may be conflicting
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// })->name('sanctum.user');

// // Redirect authenticated users to the appropriate route
// Route::middleware('auth:web,restaurant')->get('/', function (Request $request) {
//     if ($request->user()->isRestaurant()) {
//         return redirect('/restaurant');
//     } else {
//         return redirect('/users');
//     }
// });

Route::post('/addmeal', [RestaurantController::class, 'addMeal']);
Route::get('/getMenu/{id}', [RestaurantController::class, 'getMenu']);
Route::post('/addcategory', [RestaurantController::class, 'addcategory']);
Route::get('/getCategories/{id}', [RestaurantController::class, 'getCategories']);
Route::get('/getTotalUserCount/{id}', [RestaurantController::class, 'totalUserCount']);
Route::get('/getTotalMonthlyReservationCount/{id}', [RestaurantController::class, 'getTotalMonthlyReservationCount']);

Route::get('/restaurants/{restaurant_id}/halls', [HallController::class, 'index']);
Route::get('/halls/{id}', [HallController::class, 'show']);
Route::get('/halls/{hallId}/time-availabilities/{selectedDate}', [HallController::class, 'fetchTimeAvailabilities']);

Route::get('/getOrder/{id}', [RestaurantController::class, 'getOrder']);
Route::get('/getReservationsByUser/{id}', [RestaurantController::class, 'getReservationsByUser']);

Route::get('/getfloor', [RestaurantController::class, 'getFloor']);

// Waitlist
Route::post('/waitlist', [WaitlistController::class, 'store']);
