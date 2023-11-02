<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complaints;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{


    public function index()
    {
        // Retrieve all complaints from the database
        $complaints = Complaints::all();
        
        return response()->json($complaints, 200);
    }

    public function store(Request $request)
    {
        $user_id = auth()->user()->id;

        $complaint = Complaints::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'user_id' => $user_id,
            // Add other fields as necessary
        ]);

        return response()->json($complaint, 201);
    }
}

