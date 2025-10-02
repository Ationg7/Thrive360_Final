<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FreedomWallPost;
use App\Models\Challenge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function __construct()
    {
        // Middleware will be applied in routes
    }

    // Admin Registration
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'password_confirmation' => 'required|string|min:8',
                'role' => 'required|in:admin',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => 'admin',
                'is_active' => true,
            ]);

            $token = $user->createToken('admin-token')->plainTextToken;

            return response()->json([
                'message' => 'Admin registered successfully',
                'token' => $token,
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Admin registration error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Admin Login
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            if (!auth()->attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Invalid email or password'], 401);
            }

            $user = auth()->user();

            // Check if user is admin
            if (!$user->isAdmin()) {
                auth()->logout();
                return response()->json(['message' => 'Admin access required. This account does not have admin privileges.'], 403);
            }

            // Check if user is active
            if (!$user->is_active) {
                auth()->logout();
                return response()->json(['message' => 'Account is deactivated. Please contact administrator.'], 403);
            }

            $token = $user->createToken('admin-token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ]);
        } catch (\Exception $e) {
            \Log::error('Admin login error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Dashboard Statistics
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'active_users' => User::where('is_active', true)->count(),
            'total_posts' => FreedomWallPost::count(),
            'total_challenges' => Challenge::count(),
            'guest_posts' => FreedomWallPost::where('is_guest_post', true)->count(),
            'user_posts' => FreedomWallPost::where('is_guest_post', false)->count(),
        ];

        return response()->json($stats);
    }

    // User Management
    public function getUsers()
    {
        $users = User::select('id', 'name', 'email', 'role', 'is_active', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($users);
    }

    public function updateUser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'role' => 'sometimes|in:user,admin',
            'is_active' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email', 'role', 'is_active']));

        return response()->json($user);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        
        // Don't allow deleting the last admin
        if ($user->isAdmin() && User::where('role', 'admin')->count() <= 1) {
            return response()->json(['message' => 'Cannot delete the last admin'], 400);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    // Content Management
    public function getPosts()
    {
        $posts = FreedomWallPost::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($posts);
    }

    public function deletePost($id)
    {
        $post = FreedomWallPost::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function getChallenges()
    {
        $challenges = Challenge::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($challenges);
    }

    public function deleteChallenge($id)
    {
        $challenge = Challenge::findOrFail($id);
        $challenge->delete();

        return response()->json(['message' => 'Challenge deleted successfully']);
    }

    // Analytics
    public function getAnalytics()
    {
        $analytics = [
            'posts_per_day' => FreedomWallPost::selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date')
                ->get(),
            'challenges_per_day' => Challenge::selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date')
                ->get(),
            'user_registrations' => User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date')
                ->get(),
        ];

        return response()->json($analytics);
    }
}
