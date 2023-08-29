<?php

namespace App\Http\Controllers\Api;

use App\Models\View;
use App\Models\Meals;
use http\Env\Response;
use App\Models\Profile;
use App\Models\Cashiers;
use App\Models\Category;
use App\Models\Restaurants;
use Illuminate\Http\Request;
use App\Models\TableStructure;
use App\Models\TableReservation;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\addMealRequest;
use App\Http\Requests\addViewRequest;
use App\Http\Requests\addTableRequest;
use App\Http\Requests\addCashierRequest;
use App\Http\Requests\addCategoryRequest;
use App\Http\Requests\cashierLoginRequest;
use App\Http\Requests\setupProfileRequest;
use App\Http\Requests\updateEmployeeRequest;
use App\Http\Requests\RestaurantLoginRequest;
use App\Http\Requests\RestaurantSignupRequest;
use App\Http\Requests\updateRestaurantRequest;

class RestaurantController extends Controller
{
    public function show()
    {
        return view('react.restaurantlogin');
    }

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
        $user->currentAccessToken()->delete();
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
        $restaurantId = $data['restaurant_id'];

        /** @var Category $user */
        $user = Category::create([
            'restaurant_id' => $restaurantId,
            'category' => $data['category'],
        ]);

        return response()->json(['message' => 'Category Added Successfully']);

    }

    public function getCategories($id) {
     
        $category = Category::where('restaurant_id', $id)->get();

        return response()->json($category);
    
    }

    public function getCategoriestoMeal($id) {
     
        $category = Category::where('categories.restaurant_id', $id)
            ->join('meals', 'categories.id', '=', 'meals.category_id')
            ->select('categories.category AS category_name')
            ->get();


        // $reservations = TableReservation::where('table_reservations.restaurant_id', $restaurantId)
        // ->join('table_structures', 'table_reservations.table_structure_id', '=', 'table_structures.id')
        // ->select('table_reservations.*', 'table_structures.table_id')
        // ->get();

        return response()->json($category);
    
    }

    public function getOrder($id) {
     
        $order = TableReservation::where('restaurant_id', $id)->get();

        return response()->json($order);
    
    }




       /**Cashier controller items.................................................. */

    
    public function addCashier(addCashierRequest $request){
         // Make sure the user is authenticated
   
         $data = $request->validated();
        // $user = auth('restaurants')->user();
        // $restaurant = Restaurants::where('email', $user->email)->first();
       
       // $restaurant = auth('restaurants')->user();
       $restaurant = auth()->guard('restaurants')->user();
    
       $restaurantId = $data['restaurant_id'];
       
         $user = Cashiers::create ([
            'restaurant_id' => $restaurantId,
            // 'brn' => $restaurant->brn, // Associate the cashier with the restaurant
            
             'cashier_name' => $data['cashiername'],
             'email' => $data['email'],
             'cashier_phone_number' => $data['phone'],
             'password' => bcrypt($data['password']),
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


    public function displayCashier($id) {
    
     
        $cashier = Cashiers::where('id', $id)->get();
        return response()->json($cashier);
 
     
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

    /*public function getTableStructures($id)
    {
        $restaurant = Restaurants::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        // Fetch the table structures associated with the restaurant
        $tableStructures = TableStructure::where('restaurant_id', $id)->get();

        // Return the fetched table structures as a JSON response
        return response()->json($tableStructures);
    }
}
*/


public function getTableStructures($id)
{
    $restaurant = Restaurants::find($id);

    if (!$restaurant) {
        return response()->json(['message' => 'Restauranttt not found'], 404);
    }

    // Fetch the table structures associated with the restaurant
    $tableStructures = TableStructure::where('restaurant_id', $id)->get();

    // Return the fetched table structures as a JSON response
    return response()->json($tableStructures);
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
    }

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

    public function getReservations($restaurant_id) //get the cashier id
    {

        // $restaurant = Restaurants::find($id);
        $reservation = TableReservation::where('restaurant_id', $restaurant_id)->get();

        return response()->json($reservation);
    
    
    }

    public function getCheckInCount($id) //get the res id
    {$checkedInCount = TableReservation::where('restaurant_id', $id)
        ->where('status', 'checked in')
        ->count();

    return response()->json($checkedInCount);
    
    }

    public function getCheckOutCount($id) //get the res id
    {$checkedOutCount = TableReservation::where('restaurant_id', $id)
        ->where('status', 'checked out')
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

}
