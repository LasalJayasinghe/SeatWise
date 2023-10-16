<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class addOfferRequest extends FormRequest
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
            'meal' => ['required', 'string'],
            'offer_type' => ['required', 'string'],
            'offer_title' => ['required', 'string'],
            'offer_percentage' => ['required'],
            'start_date' => ['required'],
            'end_date' => ['required'],
            'minimum_purchase_amount'=>['required'],
            'days_of_week'=>['required'],
            'offer_description'=> ['required', 'string'],
            
         
        ];
    }
}