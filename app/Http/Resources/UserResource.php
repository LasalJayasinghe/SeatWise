<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'gender' => $this->gender,
            'dob' => $this->dob,
            'about' => $this->about,
            'email' => $this->email,
            'hometown' => $this->hometown,
            'jobStatus'=> $this->jobStatus,
            'created_at' => $this->created_at->format('d/m/Y'),  
        ];
    }
}
