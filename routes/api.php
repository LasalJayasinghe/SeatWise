<?php

use Illuminate\Http\Request;
use App\Http\Middleware\Cors;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\HallController;
use App\Http\Controllers\Api\HallReservationController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WaitlistController;
use App\Http\Controllers\Api\MealController;
use App\Http\Controllers\Api\AllMealsController;
use App\Http\Controllers\Api\TablefortwoController;
use App\Http\Controllers\Api\TableReservationController;
use App\Http\Controllers\Api\ComplaintController;


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
    Route::get('/user-data', [AuthController::class, 'getUserData'])->name('user-data');

    // Meal routes
    Route::get('/meals', [MealController::class, 'index'])->name('meals.index');
    Route::get('/meals/{id}', [MealController::class, 'show']);
    Route::get('/all-meals', [AllMealsController::class, 'index']);

    //Add complaint
    Route::post('/complaints', [ComplaintController::class,'store']);



    // Waitlist
    Route::post('/waitlist', [WaitlistController::class, 'store']);
    Route::get('/hallreservation', [HallReservationController::class, 'showForm']);
Route::post('/hall-reservation', [HallReservationController::class, 'create']);


    // Restaurant routes
    Route::get('/restaurantss', [RestaurantController::class, 'index']); // Fetch all restaurants
    Route::get('/restaurantss/{id}', [RestaurantController::class, 'show']); // Fetch a single restaurant by ID
    Route::get('/restaurantss/{id}/table-structures', [RestaurantController::class, 'getTableStructures']);
    Route::get('/restaurantss/{id}/available-tables', [RestaurantController::class, 'getAvailableTables']);

    Route::post('/make-reservation', [TableReservationController::class, 'makeReservation']);

    // Hall routes
    Route::get('/restaurantss/{restaurantId}/halls', [HallController::class, 'index']);
    // Hall routes
Route::get('/halls/{hallId}', [HallController::class, 'show']);
Route::get('/halls/{hallId}/time-slots/{selectedDate}', [HallController::class, 'fetchTimeSlots']);
Route::get('/halls/{hallId}/check-availability/{slotId}/{selectedDate}', [HallController::class, 'checkSlotAvailability']);


    // Additional routes for restaurant data
    Route::get('/restaurants/{restaurantId}/meals', [MealController::class, 'index']); // Fetch meals for a specific restaurant

    //TableForTwo routes
    Route::prefix('/tablefortwo')->group(function () {
        Route::get('/userdata', [AuthController::class, 'getUserData']);
        Route::get('/userDetails/{id}', [AuthController::class, 'getUserDetails']);
        Route::get('/accepted/{id}' , [TablefortwoController::class, 'getAcceptedInvites']);
        Route::get('/todayAccepted/{id}' , [TablefortwoController::class, 'getTodayInvites']);
        Route::put('/cancelReservation/{id}', [TablefortwoController::class, 'cancelReservation']);

    });

    //activities page routes
    Route::get('/get-ongoing-reservations', [TableReservationController::class, 'getOngoingReservations']);
    Route::get('/get-completed-reservations', [TableReservationController::class, 'getCompletedReservations']);

    Route::get('/userDetails/{id}', [AuthController::class, 'getUserDetails']);
    Route::get('/restaurantDetails/{id}', [AuthController::class, 'getRestaurantDetails']);
    Route::get('/tablefortwo/suggestions/getPendingInvites', [TablefortwoController::class, 'getPendingInvites']);
    Route::get('/tablefortwo/Invitations/getHistory/{id}', [TablefortwoController::class, 'getHistoryRequests']);
    Route::get('/tablefortwo/Requests/getRequests/{id}', [TablefortwoController::class, 'getHistoryAcceptedRequests']);



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
Route::get('/getOffers/{id}', [RestaurantController::class, 'getOffers']);
Route::get('/getComplaints/{id}', [RestaurantController::class, 'getComplaints']);
Route::get('/displayCashier/{cashierId}', [RestaurantController::class, 'displayCashier']);
Route::get('/displayOffer/{offerId}', [RestaurantController::class, 'displayOffer']);
Route::get('/getReservations/{restaurant_id}/{filter}/{input}', [RestaurantController::class, 'getReservations']);
Route::get('/getStatus/{reservationId}', [RestaurantController::class, 'getStatus']);
//Route::get('/restaurants/{id}', [RestaurantController::class, 'showRestaurant']); // This route fetches a single restaurant by ID
Route::get('/restaurants/{restaurant_id}', [RestaurantController::class, 'showRestaurantx']); // This route fetches a single restaurant by ID
Route::get('/restaurants/{restaurant_id}/table-structures', [RestaurantController::class, 'getTableStructures']);
Route::get('/restaurants/{restaurant_id}/available-tables', [RestaurantController::class, 'getAvailableTables']);
Route::post('/updateCashier', [RestaurantController::class, 'updateOffer']);
Route::post('/updateOffer', [RestaurantController::class, 'updateOffer']);
Route::post('/deleteEmployee/{cashierId}', [RestaurantController::class, 'deleteEmployee']);
Route::get('/getCheckInCount/{restaurant_id}', [RestaurantController::class, 'getCheckInCount']);
Route::get('/getCheckOutCount/{restaurant_id}', [RestaurantController::class, 'getCheckOutCount']);
Route::get('/getReservationCount/{restaurant_id}', [RestaurantController::class, 'getReservationCount']);
Route::get('/getRecentBookings/{restaurant_id}', [RestaurantController::class, 'getRecentBookings']);

Route::post('/deleteComplaint/{complaintID}', [RestaurantController::class, 'deleteComplaint']);
Route::post('/deleteOffer/{offerId}', [RestaurantController::class, 'deleteOffer']);
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
Route::post('/addOffer', [RestaurantController::class, 'addOffer']);
Route::get('/getMenu/{id}', [RestaurantController::class, 'getMenu']);
Route::post('/addcategory', [RestaurantController::class, 'addcategory']);
Route::get('/getCategories/{id}', [RestaurantController::class, 'getCategories']);
Route::get('/getAllCategories', [RestaurantController::class, 'getAllCategories']);
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
Route::post('/updatemealavailability', [RestaurantController::class, 'updateMealAvailability']);
Route::post('/reserve-table', [TableReservationController::class, 'reserveTable']);


// Waitlist
Route::post('/waitlist', [WaitlistController::class, 'store']);
