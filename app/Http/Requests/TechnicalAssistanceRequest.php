<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TechnicalAssistanceRequest extends FormRequest
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
            'id' => 'required',
            'restaurantname' => ['required'],
            'brn' => ['required'],
            'email' => ['required'],
            'name' => ['required'],
            'phone' => ['required', 'numeric'],
            'priority' =>['required', 'string'],
            'issue' => ['required', 'string'],

        ];
    }
}