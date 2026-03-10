<?php

namespace App\Http\Controllers;

use App\Models\Fertilizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FertilizerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Fertilizer::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'unit' => 'required|string',
            'image1' => 'nullable|image|max:2048',
            'image2' => 'nullable|image|max:2048',
            'image3' => 'nullable|image|max:2048',
        ]);

        $data = $validated;

        foreach (['image1', 'image2', 'image3'] as $imgKey) {
            if ($request->hasFile($imgKey)) {
                $path = $request->file($imgKey)->store('fertilizers', 'public');
                $data[$imgKey] = $path;
            }
        }

        $fertilizer = Fertilizer::create($data);

        return response()->json($fertilizer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fertilizer $fertilizer)
    {
        return response()->json($fertilizer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fertilizer $fertilizer)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'category' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'quantity' => 'sometimes|required|integer',
            'unit' => 'sometimes|required|string',
            'image1' => 'nullable|image|max:2048',
            'image2' => 'nullable|image|max:2048',
            'image3' => 'nullable|image|max:2048',
        ]);

        $data = $validated;

        foreach (['image1', 'image2', 'image3'] as $imgKey) {
            if ($request->hasFile($imgKey)) {
                // Delete old image if exists
                if ($fertilizer->$imgKey) {
                    Storage::disk('public')->delete($fertilizer->$imgKey);
                }
                $path = $request->file($imgKey)->store('fertilizers', 'public');
                $data[$imgKey] = $path;
            }
        }

        $fertilizer->update($data);

        return response()->json($fertilizer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fertilizer $fertilizer)
    {
        foreach (['image1', 'image2', 'image3'] as $imgKey) {
            if ($fertilizer->$imgKey) {
                Storage::disk('public')->delete($fertilizer->$imgKey);
            }
        }
        
        $fertilizer->delete();

        return response()->json(null, 204);
    }
}
