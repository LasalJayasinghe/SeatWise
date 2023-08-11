<?php

namespace App\Http\Controllers\Api;

use App\Models\View;
use App\Models\Tables;
use http\Env\Response;
use App\Models\Cashier;
use App\Models\Profile;
use App\Models\Cashiers;
use App\Models\Restaurants;
use Illuminate\Http\Request;
use App\Models\TableStructure;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\addViewRequest;
use App\Http\Requests\addTableRequest;
use App\Http\Requests\addCashierRequest;
use App\Http\Requests\cashierLoginRequest;
use App\Http\Requests\setupProfileRequest;
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

        // if ($request->hasFile('photo')) {
        //     $file = $request->file('photo');
        //     $extension = $file->getClientOriginalExtension();
        //     $filename = time() . '.' . $extension;
        //     $file->move('uploads/views/', $filename);        
        // }

        // $file = $request->file('photo');
        // $extension = $file->getClientOriginalExtension();
        // $filename = time() . '.' . $extension;
        // $file->move('uploads/views/', $filename);

        /** @var View $user */
        $user = View::create([
            'restaurant_id' => $restaurantId,
            'name' => $data['viewname'],
            'description' => $data['description'],
            'photo' => $data['photo'],
        ]);

        // $user->save();

    }

    // public function addView(addViewRequest $request)
    // {
    //     $data = $request->validated();

    //     $restaurantId = $data['restaurant_id'];

    //     /** @var View $user */
    //     $user = View::create ([
    //         'restaurant_id' => $restaurantId,
    //         'name' => $data['viewname'],
    //         'description' => $data['description'],

    //         if($request->hasfile('photo')){
    //             $file = $request->file('photo');
    //             $extension = $file->getClientOriginalExtension();
    //             $filename = time() . '.' . $extension;
    //             $file->move('react/src/assets/', $filename);
    //             'photo' =>image = $filename;
    //         } else {
    //             return $request;
    //             'photo'->photo = '';
    //         }
    //    ]);    
    // }

    public function addTable(addTableRequest $request)
    {
        $data = $request->validated();
        $restaurantId = $data['restaurant_id'];
        $tableId = $data['table_id'];

        /** @var Tables $user */
        $user = Tables::create([
            'restaurant_id' => $restaurantId,
            'table_id' => $tableId,
            'table_no' => $data['table_no'],
            'chairs' => $data['chairs'],
            'view_id' => $data['view_id'],
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
        // $tableId = $request->input('table_id');

        $tables = Tables::where('restaurant_id', $restaurantId) ->get();

        return response()->json($tables);
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




    public function showRestaurant($id)
    {
        $restaurant = Restaurants::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
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
        $tableStructures = TableStructure::where('restaurant_id', $id)->get();

        // Return the fetched table structures as a JSON response
        return response()->json($tableStructures);
}






public function addCashier(addCashierRequest $request){
     // Make sure the user is authenticated

     $data = $request->validated();
    // $use r = auth('restaurants')->user();
    // $restaurant = Restaurants::where('email', $user->email)->first();
   
   // $restaurant = auth('restaurants')->user();
   $restaurant = auth()->guard('restaurants')->user();

   $restaurantId = $data['restaurant_id'];
   
     $user = Cashiers::create ([
        'restaurant_id' => $restaurantId,
        // 'brn' => $restaurant->brn, // Associate the cashier with the restaurant
        
         'cashier_name' => $data['cashiername'],
         'cashier_email' => $data['email'],
         'cashier_phone_number' => $data['phone'],
         'cashier_password' => bcrypt($data['password']),
    ]);
   // return redirect('/restaurant');
  // return redirect()->route('');
   // $token = $user->createToken('main')->plainTextToken;
   return response()->json(['message' => 'Cashier successfully added']);
    //return response(compact('user', 'token'));

    
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




public function getCashiers($id) {

   // $restaurant = Restaurants::find($id);
   $cashiers = Cashiers::where('restaurant_id', $id)->get();
   return response()->json($cashiers);


}

public function getReservations($id) //get the cashier id
{

    // $restaurant = Restaurants::find($id);
    $cashiers = Cashiers::where('restaurant_id', $id)->get();
    return response()->json($cashiers);
 
 
 }


}
