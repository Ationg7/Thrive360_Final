<?php

namespace App\Http\Controllers;

use App\Models\FreedomWallPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FreedomWallController extends Controller
{
    public function index()
    {
        $posts = FreedomWallPost::orderBy('created_at', 'desc')->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $postData = [
            'content' => $request->content,
            'author' => 'Anonymous',
            'is_guest_post' => !auth()->check(),
            'user_id' => auth()->id(),
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('freedom-wall-images', 'public');
            $postData['image_path'] = $imagePath;
        }

        $post = FreedomWallPost::create($postData);

        return response()->json($post, 201);
    }

    public function like(Request $request, $id)
    {
        $post = FreedomWallPost::findOrFail($id);
        $post->incrementLikes();
        
        return response()->json([
            'message' => 'Post liked successfully',
            'likes' => $post->fresh()->likes
        ]);
    }

    public function share(Request $request, $id)
    {
        $post = FreedomWallPost::findOrFail($id);
        $post->incrementShares();
        
        return response()->json([
            'message' => 'Post shared successfully',
            'shares' => $post->fresh()->shares
        ]);
    }

    public function destroy($id)
    {
        $post = FreedomWallPost::findOrFail($id);
        
        // Only allow deletion if user owns the post or is admin
        if (auth()->check() && (auth()->id() === $post->user_id || auth()->user()->is_admin)) {
            // Delete associated image if exists
            if ($post->image_path) {
                Storage::disk('public')->delete($post->image_path);
            }
            
            $post->delete();
            
            return response()->json(['message' => 'Post deleted successfully']);
        }
        
        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
