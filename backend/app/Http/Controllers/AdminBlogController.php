<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\Storage;

class AdminBlogController extends Controller
{
    // Fetch all blogs
    public function index()
    {
        $blogs = Blog::orderBy('created_at', 'desc')->get();
        return response()->json($blogs);
    }

    // Upload a new blog
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'image_file' => 'nullable|image|max:2048',
        ]);

        $blog = new Blog($request->only([
            'title', 'content', 'category'
        ]));

        // Handle optional image
        if ($request->hasFile('image_file')) {
            $blog->image_url = $request->file('image_file')->store('blogs/images', 'public');
        }

        $blog->save();

        return response()->json($blog);
    }

    // Delete blog
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->image_url) {
            Storage::disk('public')->delete($blog->image_url);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully']);
    }
}
