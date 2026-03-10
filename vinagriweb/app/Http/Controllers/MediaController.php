<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Media::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'media_type' => 'required|in:video,news',
            'description' => 'nullable|string',
            'file' => 'nullable|file|max:10240', // 10MB max
        ]);

        $data = $validated;

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('media', 'public');
            $data['file'] = $path;
        }

        $media = Media::create($data);

        return response()->json($media, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $media)
    {
        return response()->json($media);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Media $media)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'media_type' => 'sometimes|required|in:video,news',
            'description' => 'nullable|string',
            'file' => 'nullable|file|max:10240',
        ]);

        $data = $validated;

        if ($request->hasFile('file')) {
            if ($media->file) {
                Storage::disk('public')->delete($media->file);
            }
            $path = $request->file('file')->store('media', 'public');
            $data['file'] = $path;
        }

        $media->update($data);

        return response()->json($media);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $media)
    {
        if ($media->file) {
            Storage::disk('public')->delete($media->file);
        }
        
        $media->delete();

        return response()->json(null, 204);
    }
}
