<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Feedback::latest()->get());
    }

    /**
     * Display a listing of visible resources for the public frontend.
     */
    public function publicIndex()
    {
        return response()->json(Feedback::where('is_visible', true)->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $feedback = Feedback::create($validated);

        return response()->json($feedback, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback)
    {
        return response()->json($feedback);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feedback $feedback)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email',
            'message' => 'sometimes|required|string',
            'is_visible' => 'sometimes|boolean',
        ]);

        $feedback->update($validated);

        return response()->json($feedback);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return response()->json(null, 204);
    }
}
