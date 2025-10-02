<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Challenge;
use Illuminate\Support\Facades\Storage;

class AdminChallengeController extends Controller
{
    // Fetch all challenges
    public function index()
    {
        $challenges = Challenge::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($challenges);
    }

    // Upload a new challenge
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'duration_days' => 'required|integer|min:1',
            'difficulty_level' => 'required|string',
            'category' => 'required|string',
            'image_file' => 'nullable|image|max:2048',
        ]);

        $challenge = new Challenge($request->only([
            'title', 'description', 'duration_days', 'difficulty_level', 'category'
        ]));

        if ($request->hasFile('image_file')) {
            $challenge->image_url = $request->file('image_file')->store('challenges', 'public');
        }

        $challenge->save();

        return response()->json($challenge);
    }

    // Delete a challenge
    public function destroy($id)
    {
        $challenge = Challenge::findOrFail($id);

        if ($challenge->image_url) {
            Storage::disk('public')->delete($challenge->image_url);
        }

        $challenge->delete();

        return response()->json(['message' => 'Challenge deleted successfully']);
    }
}
