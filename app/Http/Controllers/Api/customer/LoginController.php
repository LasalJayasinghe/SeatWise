<?php

namespace App\Http\Controllers\Api\customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Exception;

class LoginController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();
            $findUser = User::where('google_id', $user->id)->first();
    
            if ($findUser) {
                $token = $findUser->createToken('main')->plainTextToken;

                // Build the query parameters for the URL
                $queryParams = [
                    'user_name' => $user->name,
                    'user_email' => $user->email,
                    'user_hometown' => $user->hometown,
                    'token' => $token,
                ];
            
                // Generate the URL with query parameters
                $redirectUrl = 'http://localhost:3000/dashboard?' . http_build_query($queryParams);
            
                // Redirect to the dashboard URL
                return redirect($redirectUrl); 
            } 
            else {
                User::create([
                    'google_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    
                ]);
                Auth::login($user);
                return redirect('http://localhost:3000/dashboard');
            }
    
        } catch (Exception $e) {
            // Handle the exception, e.g., log the error
            Log::error($e->getMessage());
            return redirect('http://localhost:3000/signup');
            
        }
    }
    
    
}