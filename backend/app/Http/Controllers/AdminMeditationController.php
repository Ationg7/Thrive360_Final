<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meditation;
use Illuminate\Support\Facades\Storage;

class AdminMeditationController extends Controller
{
    // Fetch all meditations
    public function index()
    {
        $meditations = Meditation::orderBy('created_at', 'desc')->get();
        return response()->json($meditations);
    }

    // Upload a new meditation
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'duration' => 'nullable|string',
            'category' => 'required|string',
            'image_file' => 'nullable|image|max:2048',
        ]);

        $meditation = new Meditation($request->only([
            'title', 'description', 'duration', 'category'
        ]));


        // Handle optional image file
        if ($request->hasFile('image_file')) {
            $meditation->image_url = $request->file('image_file')->store('meditations/images', 'public');
        }

        $meditation->save();

        return response()->json($meditation);
    }

    // Delete meditation
    public function destroy($id)
    {
        $meditation = Meditation::findOrFail($id);


        if ($meditation->image_url) {
            Storage::disk('public')->delete($meditation->image_url);
        }

        $meditation->delete();

        return response()->json(['message' => 'Meditation deleted successfully']);
    }
}
