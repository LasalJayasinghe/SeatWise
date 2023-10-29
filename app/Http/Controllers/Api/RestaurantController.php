<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use http\Env\Response;
use App\Mail\AssistanceRequest;
use App\Http\Controllers\Controller;
use Laravel\Sanctum\Sanctum;


use App\Models\User;
use App\Models\View;
use App\Models\Meals;
use App\Models\Offers;
use App\Models\Profile;
use App\Models\Cashiers;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Restaurant;
use App\Models\Complaints;
use App\Models\Restaurants;
use App\Models\TableStructure;
use App\Models\TableReservation;
use App\Models\TechnicalAssistance;

use App\Http\Requests\addMealRequest;
use App\Http\Requests\addViewRequest;
use App\Http\Requests\addOfferRequest;
use App\Http\Requests\addTableRequest;
use App\Http\Requests\addCashierRequest;
use App\Http\Requests\addCategoryRequest;
use App\Http\Requests\updateOfferRequest;
use App\Http\Requests\cashierLoginRequest;
use App\Http\Requests\setupProfileRequest;
use App\Http\Requests\updateEmployeeRequest;
use App\Http\Requests\RestaurantLoginRequest;
use App\Http\Requests\RestaurantSignupRequest;
use App\Http\Requests\updateRestaurantRequest;
use App\Http\Requests\TechnicalAssistanceRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $area = $request->query('area');
    
        $query = Restaurant::query();
    
        if ($area) {
            $query->where('area', $area);
        }
    
        $restaurants = $query->with('profile')->get();

        $restaurantsWithAvgRate = $restaurants->map(function ($restaurant) {
            $avgRate = $restaurant->rates->average('starCount');
            $restaurant->avgRate = $avgRate;
    
            return $restaurant;
        });
    
        return response()->json($restaurantsWithAvgRate);
    }
    

    
    public function show($id)
    {
        $restaurant = Restaurant::find($id);
    
        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }
    
        return response()->json($restaurant);
    }
    
    public function getAvailableTables(Request $request, $restaurantId)
    {
        $date = $request->input('date');
        $startTime = $request->input('start_time');
        $endTime = $request->input('end_time');
        $numParticipants = $request->input('num_participants');

        $tableStructures = TableStructure::where('restaurant_id', $restaurantId)->get();
        $reservedTableIds = TableReservation::where('restaurant_id', $restaurantId)
            ->where('reservation_date', $date)
            ->where('start_time', '<=', $endTime)
            ->where('end_time', '>=', $startTime)
            ->pluck('table_structure_id')
            ->toArray();

            foreach ($tableStructures as $table) {
                $table->isAvailable = !in_array($table->id, $reservedTableIds) && $table->number_of_chairs >= $numParticipants;

                // Check if the table is unavailable but has the tablefortwo option enabled
                $tableReservation = TableReservation::where('restaurant_id', $restaurantId)
                    ->where('reservation_date', $date)
                    ->where('start_time', '<=', $endTime)
                    ->where('end_time', '>=', $startTime)
                    ->where('table_structure_id', $table->id)
                    ->first();
                
                $table->isTableForTwo = !$table->isAvailable && $tableReservation && $tableReservation->tablefortwo == 1;

            }               

        return response()->json($tableStructures);
    }
    
    //---------------------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------Restaurant Side controllers---------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------------------
    
    // public function show()
    // {
    //     return view('react.restaurantlogin');
    // }

    public function restaurantsignup(RestaurantSignupRequest $request){
        $data = $request->validated();
        /** @var Restaurants $user */
        $user = Restaurants::create([
            'restaurantname' => $data['restaurantname'],
            'brn' => $data['brn'],
            'email' => $data['email'],
            'name' => $data['name'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

        // return response()->json(['user' => $user, 'token' => $token, 'redirect_url' => '/restaurant']);
        //return redirect('/restaurant');
        // return view('restaurant');
        // 
    }

    public function restaurantlogin(RestaurantLoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::guard('restaurants')->attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\Restaurants $user */
        $user = Auth::guard('restaurants')->user();
        if (!$user instanceof Restaurants) {
            return response([
                'message' => 'User authentication failed'
            ], 422);
        }
        
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\Restaurants $user */
        $user = $request->user();
    
        // Revoke the current user's token
        $user->tokens->each->delete();
    
        return response('', 204);
    }
    

    public function addView(addViewRequest $request)
    {
        $data = $request->validated();
        $restaurantId = $data['restaurant_id'];

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('uploads/views/', $filename); 
            
            $photoPath = 'uploads/views/' . $filename;
        }

        // $file = $request->file('photo');
        // $extension = $file->getClientOriginalExtension();
        // $filename = time() . '.' . $extension;
        // $file->move('uploads/views/', $filename);

        /** @var View $user */
        $user = View::create([
            'restaurant_id' => $restaurantId,
            'name' => $data['viewname'],
            'description' => $data['description'],
            'photo' => $photoPath ?? null,
        ]);

        // $user->save();

    }

    public function addTable(addTableRequest $request)
    {
        $data = $request->validated();
        $restaurantId = $data['restaurant_id'];
        $tableId = $data['table_id'];

        /** @var TableStructure $user */
        $user = TableStructure::create([
            'restaurant_id' => $restaurantId,
            'table_id' => $tableId,
            'table_number' => $data['table_number'],
            'floor' => $data['floor'],
            'number_of_chairs' => $data['number_of_chairs'],
            'view' => $data['view'],
            'posX' => $data['posX'],
            'posY' => $data['posY'],
        ]);

    }

    public function getViews(Request $request)
    {
        // Access the 'restaurant_id' parameter from the request
        $restaurantId = $request->input('restaurant_id');

        // Assuming you have a 'restaurant_id' column in the 'views' table
        $views = View::where('restaurant_id', $restaurantId)->get();

        return response()->json($views);
    }

    public function getTable(Request $request)
    {
        
        $restaurantId = $request->input('restaurant_id');

        $tables = TableStructure::where('restaurant_id', $restaurantId)->get();
        return response()->json($tables);
    }

    public function getReservedTable(Request $request)
    {
        
        $restaurantId = $request->input('restaurant_id');

        $reservations = TableReservation::where('table_reservations.restaurant_id', $restaurantId)
            ->join('table_structures', 'table_reservations.table_structure_id', '=', 'table_structures.id')
            ->select('table_reservations.*', 'table_structures.table_id')
            ->get();
        return response()->json($reservations);
    }

    public function getProfile(Request $request)
    {
        
        $restaurantId = $request->input('restaurant_id');
        // $tableId = $request->input('table_id');

        /** @var \App\Models\Restaurants $user */
        $restaurant = Restaurants::where('id', $restaurantId) ->get();

        return response()->json($restaurant);
    }

    public function setUpProfile(setupProfileRequest $request)
    {
        $data = $request->validated();
        $restaurantId = $data['restaurant_id'];

        $updatedData = [
            'city' => $data['city'],
            'state' => $data['state'],
            'zip' => $data['zip'],
            'description' => $data['description'],
            'cover' => $data['cover'],
            'type' => $data['type'],
            'floors' => $data['floors'],
            'monday' => $data['monday'],
            'tuesday' => $data['tuesday'],
            'wednesday' => $data['wednesday'],
            'thursday' => $data['thursday'],
            'friday' => $data['friday'],
            'saturday' => $data['saturday'],
            'sunday' => $data['sunday'],
            'opening' => $data['opening'],
            'closing' => $data['closing'],
        ];
        /** @var Profile $profile */
        $profile = Profile::updateOrCreate(
            ['restaurant_id' => $restaurantId],
            $updatedData
        );

    }

    public function getSetUpProfile(Request $request)
    {
        
        $restaurantId = $request->input('restaurant_id');
        // $tableId = $request->input('table_id');

        /** @var \App\Models\Profile $user */
        $restaurant = Profile::where('restaurant_id', $restaurantId) ->get();

        return response()->json($restaurant);
    }

    public function editRestaurant(updateRestaurantRequest $request) {
        $data = $request->validated();
        $restaurantId = $data['restaurant_id'];
        
        // Update first table (Assuming 'restaurants' table)
        $restaurant = Restaurants::find($restaurantId);
        if ($restaurant) {
            $restaurant->update([
                'restaurantname' => $data['restaurantname'],
                'brn' => $data['brn'],
                'email' => $data['email'],
                'name' => $data['name'],
                'phone' => $data['phone'],
            ]);
        } else {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        // Update second table (Assuming 'restaurant_details' table)
        $profile = Profile::where('restaurant_id', $restaurantId)->first();
        if ($profile) {
            $profile->update([
                'city' => $data['city'],
                'state' => $data['state'],
                'zip' => $data['zip'],
                'description' => $data['description'],
                'cover' => $data['cover'],
                'type' => $data['type'],
                'floors' => $data['floors'],
                'opening' => $data['opening'],
                'closing' => $data['closing'],
            ]);
        } else {
            return response()->json(['message' => 'Restaurant details not found'], 404);
        }

        return response()->json(['message' => 'Update successful']);
    }

    public function addMeal(addMealRequest $request)
    {
        $data = $request->validated();
        $restaurantId = $data['restaurant_id'];

        /** @var Meals $user */
        $user = Meals::create([
            'restaurant_id' => $restaurantId,
            'name' => $data['name'],
            'category_id' => $data['category_id'],
            'potion' => $data['potion'],
            'price' => $data['price'],
            'description' => $data['description'],
        ]);

        return response()->json(['message' => 'Meal Added Successfully']);

    }

    public function getMenu($id) {
    
        $menu = Meals::where('restaurant_id', $id)->get();

        return response()->json($menu);

    }

    public function addcategory(addCategoryRequest $request)
    {
        $data = $request->validated();

        /** @var Category $user */
        $user = Category::create([
            'category' => $data['category'],
        ]);

        return response()->json(['message' => 'Category Added Successfully']);

    }

    public function getCategories($id) {
    
        $category = Meals::where('meals.restaurant_id', $id)
            ->join('categories', 'meals.category_id', '=', 'categories.id')
            ->distinct()
            ->select('categories.id','categories.category')
            ->get();

        return response()->json($category);

    }

    public function getAllCategories() {
    
        $category = Category::all();

        return response()->json($category);

    }

    public function getOrder($id) {

        $today = now()->toDateString();
    
        $order = TableReservation::where('restaurant_id', $id)
            ->whereDate('reservation_date', $today)
            ->get();

        return response()->json($order);

    }

    public function getAllOrder($id) {
    
        $order = TableReservation::where('restaurant_id', $id)
            ->get();

        return response()->json($order);

    }

    public function totalUserCount($id) {
    
        $order = TableReservation::where('restaurant_id', $id)
            ->count();

        return response()->json($order);

    }

    public function getReservationsByUser($id)
    {
        
        // $restaurantId = $request->input('restaurant_id');

        $reservations = TableReservation::where('table_reservations.restaurant_id', $id)
            ->join('users', 'table_reservations.reservant_ID', '=', 'users.id')
            ->distinct()
            ->select('users.*')
            ->get();
        return response()->json($reservations);
    }

    public function getTotalMonthlyReservationCount($id) {
        // Get the current year and month
        $currentYear = now()->year;
        $currentMonth = now()->month;

        $reservationCount = TableReservation::where('restaurant_id', $id)
            ->whereYear('reservation_date', $currentYear)
            ->whereMonth('reservation_date', $currentMonth)
            ->count();

        return response()->json($reservationCount);
    }

    public function getFloor(Request $request)
    {
        
        // $restaurantId = $request->input('restaurant_id');

        // $floors = Profile::where('restaurant_id', $restaurantId)
        //     ->get();
        // return response()->json($floors);

        $restaurantId = $request->input('restaurant_id');

        $profile = Profile::where('restaurant_id', $restaurantId)->first();

        if ($profile) {
            // Assuming "floors" is a column in your "profiles" table
            $floorsValue = $profile->floors;

            return response()->json(['floors' => $floorsValue]);
        } else {
            // Handle the case where no matching profile is found for the given restaurant_id
            return response()->json(['error' => 'Profile not found'], 404);
        }
        
    }

    public function getCustomer(Request $request)
    {
        
        $restaurantId = $request->input('restaurant_id');

        $tables = TableReservation::where('table_reservations.restaurant_id', $restaurantId)
            ->join('users', 'table_reservations.reservant_ID', '=', 'users.id')
            ->distinct()
            ->select('users.*')
            ->get();
        return response()->json($tables);
    }

    public function updateMealAvailability(Request $request)
    {
        $mealId = $request->input('id');
        $newAvailability = $request->input('availability'); 

        $meal = Meals::find($mealId);
        if($meal){
            $meal->update([
                'availability' => $newAvailability
            ]);
        }
        
        return response()->json(['message' => 'Meal Added Successfully']);

    }

    // public function updateMealAvailability(Request $request)
    // {
    //     $mealId = $request->input('id');
    //     $newAvailability = $request->input('availability'); 

    //     $meal = Meals::where('id', $mealId)->first();
    //     if($meal){
    //         $meal->update([
    //             'availability' => $newAvailability
    //         ]);
    //     }
        
    //     return response()->json(['message' => 'Meal Added Successfully']);

    // }

// public function updateMealAvailability($id)
// {
    // $request->validate([
    //     'id' => 'required|integer',
    //     'availability' => 'required|boolean', // Assuming availability is a boolean field
    // ]);

    // $mealId = $request->input('id');
    // $newAvailability = $request->input('availability');

    // $meal = Meals::find($mealId);

    // if (!$meal) {
    //     return response()->json(['message' => 'Meal not found'], 404);
    // }

    // try {
    //     $meal->update([
    //         'availability' => $newAvailability,
    //     ]);

    //     return response()->json(['message' => 'Meal updated successfully']);
    // } catch (\Exception $e) {
    //     return response()->json(['message' => 'Failed to update meal'], 500);
    // }

    // $mealAvailability = Meals::find($id);
    // if ($mealAvailability) {
    //     $mealAvailability->update([
    //         'availability' => $data['availability'],
            
    //     ]);


    // }
// }





    /**Cashier controller items.................................................. */


    
       public function addCashier(addCashierRequest $request) {
        // Make sure the user is authenticated
    
        $data = $request->validated();
        $restaurant = auth()->guard('restaurants')->user();
        $restaurantId = $data['restaurant_id'];
        
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('uploads/cashiers/', $filename); 
            
            $photoPath = 'uploads/cashiers/' . $filename;
        }
        // Check if a photo file was uploaded
        
    
        $user = Cashiers::create([
            'restaurant_id' => $restaurantId,
            'cashier_name' => $data['cashiername'],
            'email' => $data['email'],
            'cashier_phone_number' => $data['phone'],
            'password' => bcrypt($data['password']),
            'photo' => $photoPath ?? null,
        ]);
    
        return response()->json(['message' => 'Successfully added']);
    }
    
/////////////



    public function addOffer(addOfferRequest $request){
        // Make sure the user is authenticated
  
        $data = $request->validated();
       // $user = auth('restaurants')->user();
       // $restaurant = Restaurants::where('email', $user->email)->first();
      
      // $restaurant = auth('restaurants')->user();
      $start_date = date('Y-m-d H:i:s', strtotime($data['start_date']));
      $end_date = date('Y-m-d H:i:s', strtotime($data['end_date']));
      $restaurant = auth()->guard('offers')->user();
    
      $restaurantId = $data['restaurant_id']; 
      
        $user = Offers::create ([
           
           'restaurant_id' => $restaurantId,
           // 'brn' => $restaurant->brn, // Associate the cashier with the restaurant
           
            'meal' => $data['meal'],
            'offer_type' => $data['offer_type'],
            'offer_title' => $data['offer_title'],
            'offer_percentage' => $data['offer_percentage'],
            'start_date' => $start_date,
            'end_date' => $end_date,
            'days_of_week' => $data['days_of_week'],
            'minimum_purchase_amount' => $data['minimum_purchase_amount'],
            'offer_description' => $data['offer_description'],
          
           
       ]);
      // return redirect('/restaurant');
      // $token = $user->createToken('main')->plainTextToken;
      return response()->json(['message' => 'Successfully added']);
       //return response(compact('user', 'token'));

       
   }
    public function getCashiers($id) {

    // $restaurant = Restaurants::find($id);
    $cashiers = Cashiers::where('restaurant_id', $id)->get();
    return response()->json($cashiers);


    }


    public function getOffers($id) {
    
        // $restaurant = Restaurants::find($id);
        $offers = Offers::where('restaurant_id', $id)->get();
        return response()->json($offers);
 
     
     }
    public function displayCashier($id) {

    
        $cashier = Cashiers::where('id', $id)->get();
        return response()->json($cashier);

    
    }

  
     public function displayOffer($id) {
    
     
        $offer = Offers::where('id', $id)->get();
        return response()->json($offer);
 
     
     }

    public function showRestaurant($id)
    {
        $restaurant = Restaurants::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurantshow not found'], 404);
        }

        return response()->json($restaurant);
    }

    public function showRestaurantx($id)
    {
        $restaurant = Restaurants::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurantshowx not found'], 404);
        }

        return response()->json($restaurant);
    }

    public function getTableStructures($id)
    {
        $restaurant = Restaurants::find($id);
    
        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }
    
        // Fetch the table structures associated with the restaurant
        $tableStructures = TableStructure::with('view')->where('restaurant_id', $id)->get();
    
        // Return the fetched table structures as a JSON response
        return response()->json($tableStructures);
    }

    public function cashierLogin(cashierLoginRequest $request)
    {   
        $credentials = $request->validated();
        if (!Auth::guard('cashiers')->attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\Cashiers $user */
        $user = Auth::guard('cashiers')->user();
        if (!$user instanceof Cashiers) {
            return response([
                'message' => 'User authentication failed'
            ], 422);
        }
        
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function getReservations($restaurant_id,$filter,$input) 
    {
           if($input){
        // $restaurant = Restaurants::find($id);
        if ($filter == "all" ) {
            $reservation = TableReservation::where('restaurant_id', $restaurant_id)
            ->where('reservationNumber',$input)
            ->get();
        } else if ($filter == "checkedIn") {
            $reservation = TableReservation::where('restaurant_id', $restaurant_id)
                ->where('status', 1)
                ->where('reservationNumber',$input)
                ->get();
        } else if ($filter == "checkedOut") {
            $reservation = TableReservation::where('restaurant_id', $restaurant_id)
                ->where('reservationNumber',$input)
                ->get();
        } else if ($filter == "pending") {
            $reservation = TableReservation::where('restaurant_id', $restaurant_id)
                ->where('status', 2)
                ->where('reservationNumber',$input)
                ->get();
        } 

       
           }


       
           

           else

           {

            if ($filter == "all" ) {
                $reservation = TableReservation::where('restaurant_id', $restaurant_id)
               
                ->get();
            } else if ($filter == "checkedIn") {
                $reservation = TableReservation::where('restaurant_id', $restaurant_id)
                    ->where('status', 1)
                  
                    ->get();
            } else if ($filter == "checkedOut") {
                $reservation = TableReservation::where('restaurant_id', $restaurant_id)
                ->where('status', 0)
                    ->get();
            } else if ($filter == "pending") {
                $reservation = TableReservation::where('restaurant_id', $restaurant_id)
                    ->where('status', 2)
                 
                    ->get();
            } 

           


           }

        return response()->json($reservation);


    }

    public function getCheckInCount($id) //get the res id

    {   $today = date('Y-m-d');
        
        $checkedInCount = TableReservation::where('restaurant_id', $id)
        ->where('reservation_date', $today)
        ->where('status', 1)
        ->count();

    return response()->json($checkedInCount);

    }

    public function getCheckOutCount($id) //get the res id
    {  
        $today = date('Y-m-d');
        $checkedOutCount = TableReservation::where('restaurant_id', $id)
        ->where('reservation_date', $today)
        ->where('status', 0)
        ->count();

    return response()->json($checkedOutCount);

    }


    public function getReservationCount($id) //get the res id

    {
        $today = date('Y-m-d');
        
        $ReservationCount = TableReservation::where('restaurant_id', $id)
        ->where('reservation_date', $today)
        ->count();

    return response()->json($ReservationCount);

    }



    public function getRecentBookings($id)
    {
        $now = now(); // Get the current date and time
        $today = $now->format('Y-m-d');
        
        $upcomingBookings = TableReservation::where('restaurant_id', $id)
            ->where('reservation_date', $today)
            ->where('start_time', '>', $now->format('H:i:s')) // Filter future bookings
            ->orderBy('start_time')
            ->take(3) // Get the nearest three bookings
            ->get();

        return response()->json($upcomingBookings);
    }



public function HandleCheckOut($reservationId)
{
     
    $reservation = TableReservation::find($reservationId);
    if ($reservation) {
        $reservation->update([
            'status' => 0,
            
        ]);


    }
    }

    public function HandleCheckIn($reservationId)
    {

    $reservation = TableReservation::find($reservationId);
    if ($reservation) {
        $reservation->update([
            'status' => 1,
            
        ]);


    }
    }


    public function getStatus($reservationId,$reservation_date) 
    {   
    $today = date('Y-m-d');
    //$today = Carbon::today(); // Get today's date
    $reservation = TableReservation::where('id', $reservationId)
    ->where('reservation_date', $today)->get();;
    return response()->json($reservation);


    }
    public function updateCashier(updateEmployeeRequest $request) {
    $data = $request->validated();
    /** @var Cashiers $cashier */
    //$restaurant = auth()->guard('restaurants')->user();
    $cashierId = $data['id'];
    $cashier = Cashiers::find($cashierId);
    // $restaurant = Restaurant::find($id);
    if ($cashier) {
    $cashier->update([
        //'id' => $restaurantId,
        'cashier_name' => $data['cashiername'],
        'email' => $data['email'],
        'cashier_phone_number' => $data['phone'],
        'password' => bcrypt($data['password']),
    ]);
    return response()->json(['message' => ' Successfully updated']);
    }

    else{
    return response()->json(['message' => 'Updatation failed']);  





    }

    }

    public function updateOffer(updateOfferRequest $request) {
    $data = $request->validated();
    /** @var Offers $offer */
    //$restaurant = auth()->guard('restaurants')->user();
   $offerId = $data['id'];
   $offer = Offers::find($offerId);
   // $restaurant = Restaurant::find($id);
   if ($offer) {
    $start_date = date('Y-m-d H:i:s', strtotime($data['start_date']));
    $end_date = date('Y-m-d H:i:s', strtotime($data['end_date']));
    $offer->update([
        //'id' => $restaurantId,
       // 'restaurant_id' => $restaurantId,
           // 'brn' => $restaurant->brn, // Associate the cashier with the restaurant
           
            'meal' => $data['meal'],
            'offer_type' => $data['offer_type'],
            'offer_title' => $data['offer_title'],
            'offer_percentage' => $data['offer_percentage'],
            'start_date' => $start_date,
            'end_date' => $end_date,
            'days_of_week' => $data['days_of_week'],
            'minimum_purchase_amount' => $data['minimum_purchase_amount'],
            'offer_description' => $data['offer_description'],
            
        
    ]);
    return response()->json(['message' => ' Successfully updated']);
   }

   else{
    return response()->json(['message' => 'Updatation failed']);  





   }
 
}

public function deleteEmployee($id)
{
    $cashier = Cashiers::find($id);

    if ($cashier) {
        $cashier->delete();
        //return response()->json(['message' => 'Cashier record deleted successfully']);
    } else {
    // return response()->json(['message' => 'Cashier record not found'], 404);
    }
    }

public function deleteOffer($id)
{
    $Offer=Offers::find($id);

    if ($Offer) {
        $Offer->delete();
        //return response()->json(['message' => 'Cashier record deleted successfully']);
    } else {
       // return response()->json(['message' => 'Cashier record not found'], 404);
    }
}


    public function addTechincalAssistanceRequest(TechnicalAssistanceRequest $request){
    $data = $request->validated();


    $reocrd = TechnicalAssistance::create([

        'restaurant_id'=>$data['id'],
        'issue_description'=>$data['issue'],
        'priority'=>$data['priority'],
        
    ]);

    $emailData = [
        'email' => $data['email'],
        'priority' => $data['priority'],
        'restaurantName' => $data['restaurantname'],
        'brn' => $data['brn'],
        // Add other email data as needed
    ];

    // Send an email using the email-related data
    // You can use Laravel's email sending functionality here

    // Example of sending an email using the Mail facade
    Mail::to($data['email'])->send(new AssistanceRequest($emailData));

    return response()->json(['message' => 'Successfully sent the email']);

    // return response()->json(['user' => $user, 'token' => $token, 'redirect_url' => '/restaurant']);
    //return redirect('/restaurant');
    // return view('restaurant');
    // 
    }

public function getComplaints($id) {
    
    // $restaurant = Restaurants::find($id);
    $cashiers = Complaints::where('restaurantID', $id)
    ->join('users', 'complaints.userID', '=', 'users.id')
    ->select('complaints.*','users.name as name', 'users.email as user_email')
    ->get();

    return response()->json($cashiers);

 
 }

}
