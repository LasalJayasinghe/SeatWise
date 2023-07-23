<?php

namespace App\Http\Controllers\Api;

use http\Env\Response;
use App\Models\Cashier;
use App\Models\Restaurants;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\addCashierRequest;
use App\Http\Requests\RestaurantLoginRequest;
use App\Http\Requests\RestaurantSignupRequest;
use App\Models\Cashiers;

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
        // return redirect('/restaurant');
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

    public function addCashier(addCashierRequest $request){
         // Make sure the user is authenticated
   
         $data = $request->validated();
        // $user = auth('restaurants')->user();
        // $restaurant = Restaurants::where('email', $user->email)->first();
       
         // Find the specific user instance by its ID and then call update method on it
         $user = Cashiers::create ([
             'cashier_name' => $data['cashiername'],
             'cashier_email' => $data['email'],
             'cashier_phone_number' => $data['phone'],
             'cashier_password' => bcrypt($data['password']),
         ]);
     
       //  return redirect()->route('');
       
        
    }









}
