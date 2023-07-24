<?php

namespace App\Http\Controllers\Api;

use App\Models\View;
use http\Env\Response;
use App\Models\Cashier;
use App\Models\Cashiers;
use App\Models\Restaurants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\addViewRequest;
use App\Http\Requests\addCashierRequest;
use App\Http\Requests\RestaurantLoginRequest;
use App\Http\Requests\RestaurantSignupRequest;

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

        /** @var View $user */
        $user = View::create ([
            'restaurant_id' => $restaurantId,
            'name' => $data['viewname'],
            'photo' => $data['photo'],
            'description' => $data['description'],
       ]);
    }

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
             'cashier_email' => $data['email'],
             'cashier_phone_number' => $data['phone'],
             'cashier_password' => bcrypt($data['password']),
        ]);
       // return redirect('/restaurant');
       // $token = $user->createToken('main')->plainTextToken;
       return response()->json(['message' => 'Cashier successfully added']);
        //return response(compact('user', 'token'));

        
    }









}
