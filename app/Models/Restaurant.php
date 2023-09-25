<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'restaurants';

    // Define the fillable attributes (if applicable)
    protected $fillable = ['restaurantname', 'description','image'];

    // Add any additional methods or relationships as needed
}


// $image = $request->file('image');
// $imagePath = $image->store('restaurant_images', 'public');

// $restaurant = new Restaurant();
// $restaurant->name = $request->input('name');
// $restaurant->description = $request->input('description');
// $restaurant->image = $imagePath;
// $restaurant->save();
