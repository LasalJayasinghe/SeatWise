<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class addMealRequest extends FormRequest
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
            'meal_id' => 'required',
            'name' => 'required',
            'category' => 'required',
            'potion' => 'required',
            'price' => 'required',
            'description' => 'required',
        ];
    }
}
