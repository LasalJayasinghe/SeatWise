<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
Use Illuminate\Database\Eloquent\Model;

class TechnicalAssistance extends Authenticatable
{ 
    use HasApiTokens, HasFactory, Notifiable;

    protected $guard = 'technical_assistances';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'restaurant_id',
        'issue_description',
        'priority',
        'status',
    
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
   
     */
   

    /**
     * The attributes that should be cast.
     *
     
     */
   

    // public function getAuthIdentifier()
    // {
    //     return $this->getKey();
    // }

    // public function getAuthPassword()
    // {
    //     return $this->password;
    // }

    // public function getRememberToken()
    // {
    //     return $this->remember_token;
    // }

    // public function setRememberToken($value)
    // {
    //     $this->remember_token = $value;
    // }

    // public function getRememberTokenName()
    // {
    //     return 'remember_token';
    // }

}
