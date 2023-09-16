<?php

namespace App\Http\Controllers\Api\customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Models\Customer;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            // 'hometown' => $data['hometown'],
        ]);

        /** @var \App\Models\Customer $customer */
        // $customer = Customer::create([
        //     'firstname'=>'hellow',
        //     'lastname'=>'yellow',
        // ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }
    
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
    
        // Return the user data with the 'name' attribute included
        return response([
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
            'hometown' => $user->hometown,

        ]);
    }
    

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->tokens()->delete();
        return response('', 204);
    }

    public function getUserData(Request $request)
    {
        // Logic to get user data
        // For example, you can access the authenticated user's data with $request->user();
        $user = $request->user();

        return response()->json($user);
    }
    
}