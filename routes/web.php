<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\customer\AuthController;
use App\Http\Controllers\Api\customer\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Web routes
Route::get('/google', function () {
    return view('googleAuth'); // Assuming this is a web page
});


Route::get('auth/google', 'App\Http\Controllers\Api\customer\LoginController@redirectToGoogle');
Route::get('auth/google/callback', 'App\Http\Controllers\Api\customer\LoginController@handleGoogleCallback');
