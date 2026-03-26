<?php

namespace App\Http\Controllers;

use App\Models\CropProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CropProgramController extends Controller
{
    /**
     * List all crop programs (used by frontend and admin).
     */
    public function index()
    {
        $crops = CropProgram::orderBy('sort_order')->orderBy('id')->get()->map(function ($crop) {
            return [
                'id'         => $crop->id,
                'name'       => $crop->name,
                'sort_order' => $crop->sort_order,
                'image'      => $crop->image ? asset('storage/' . $crop->image) : null,
                'flyer'      => $crop->flyer  ? asset('storage/' . $crop->flyer)  : null,
            ];
        });

        return response()->json($crops);
    }

    /**
     * Store a new crop program.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'sort_order' => 'nullable|integer',
            'image'      => 'nullable|image|max:4096',
            'flyer'      => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:8192',
        ]);

        $data = [
            'name'       => $validated['name'],
            'sort_order' => $validated['sort_order'] ?? 0,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('crop-programs/images', 'public');
        }

        if ($request->hasFile('flyer')) {
            $data['flyer'] = $request->file('flyer')->store('crop-programs/flyers', 'public');
        }

        $crop = CropProgram::create($data);

        return response()->json([
            'id'         => $crop->id,
            'name'       => $crop->name,
            'sort_order' => $crop->sort_order,
            'image'      => $crop->image ? asset('storage/' . $crop->image) : null,
            'flyer'      => $crop->flyer  ? asset('storage/' . $crop->flyer)  : null,
        ], 201);
    }

    /**
     * Show a single crop program.
     */
    public function show(CropProgram $cropProgram)
    {
        return response()->json([
            'id'         => $cropProgram->id,
            'name'       => $cropProgram->name,
            'sort_order' => $cropProgram->sort_order,
            'image'      => $cropProgram->image ? asset('storage/' . $cropProgram->image) : null,
            'flyer'      => $cropProgram->flyer  ? asset('storage/' . $cropProgram->flyer)  : null,
        ]);
    }

    /**
     * Update a crop program.
     */
    public function update(Request $request, CropProgram $cropProgram)
    {
        $validated = $request->validate([
            'name'       => 'sometimes|required|string|max:255',
            'sort_order' => 'nullable|integer',
            'image'      => 'nullable|image|max:4096',
            'flyer'      => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:8192',
        ]);

        $data = [];

        if (isset($validated['name'])) {
            $data['name'] = $validated['name'];
        }

        if (isset($validated['sort_order'])) {
            $data['sort_order'] = $validated['sort_order'];
        }

        if ($request->hasFile('image')) {
            if ($cropProgram->image) {
                Storage::disk('public')->delete($cropProgram->image);
            }
            $data['image'] = $request->file('image')->store('crop-programs/images', 'public');
        }

        if ($request->hasFile('flyer')) {
            if ($cropProgram->flyer) {
                Storage::disk('public')->delete($cropProgram->flyer);
            }
            $data['flyer'] = $request->file('flyer')->store('crop-programs/flyers', 'public');
        }

        $cropProgram->update($data);

        return response()->json([
            'id'         => $cropProgram->id,
            'name'       => $cropProgram->name,
            'sort_order' => $cropProgram->sort_order,
            'image'      => $cropProgram->image ? asset('storage/' . $cropProgram->image) : null,
            'flyer'      => $cropProgram->flyer  ? asset('storage/' . $cropProgram->flyer)  : null,
        ]);
    }

    /**
     * Delete a crop program and its files.
     */
    public function destroy(CropProgram $cropProgram)
    {
        if ($cropProgram->image) {
            Storage::disk('public')->delete($cropProgram->image);
        }
        if ($cropProgram->flyer) {
            Storage::disk('public')->delete($cropProgram->flyer);
        }

        $cropProgram->delete();

        return response()->json(null, 204);
    }
}
