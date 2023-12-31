<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class addCashierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'restaurant_id' => 'required',
            'cashiername' => ['required', 'string'],
            'email' => ['required', 'email'],
            'address' => ['required', 'string'],
            'phone' => ['required', 'numeric'],
            'password' => [
                'required',
            ],
            'photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            
        ];
    }
}