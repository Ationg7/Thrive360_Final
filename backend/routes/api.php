<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FreedomWallController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminChallengeController; // Make sure this is imported
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'getAllUsers']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Freedom Wall routes
Route::get('/freedom-wall/posts', [FreedomWallController::class, 'index']);
Route::post('/freedom-wall/posts', [FreedomWallController::class, 'store']);
Route::post('/freedom-wall/posts/{id}/like', [FreedomWallController::class, 'like']);
Route::post('/freedom-wall/posts/{id}/share', [FreedomWallController::class, 'share']);

// Challenge routes (public)
Route::get('/challenges', [ChallengeController::class, 'index']);
Route::get('/challenges/{id}', [ChallengeController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Freedom Wall protected routes
    Route::delete('/freedom-wall/posts/{id}', [FreedomWallController::class, 'destroy']);
    
    // Challenge protected routes
    Route::post('/challenges', [ChallengeController::class, 'store']);
    Route::put('/challenges/{id}', [ChallengeController::class, 'update']);
    Route::delete('/challenges/{id}', [ChallengeController::class, 'destroy']);
    Route::post('/challenges/{id}/join', [ChallengeController::class, 'join']);
    Route::post('/challenges/{id}/progress', [ChallengeController::class, 'updateProgress']);
    Route::get('/challenges/{id}/progress', [ChallengeController::class, 'getUserProgress']);

    // Admin routes (protected with admin middleware)
    Route::prefix('admin')->middleware('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::put('/users/{id}', [AdminController::class, 'updateUser']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
        Route::get('/posts', [AdminController::class, 'getPosts']);
        Route::delete('/posts/{id}', [AdminController::class, 'deletePost']);
        Route::get('/analytics', [AdminController::class, 'getAnalytics']);
        Route::post('/meditation', [AdminController::class, 'storeMeditation']);

        // --- Admin Challenge Routes ---
        Route::get('/challenges', [AdminChallengeController::class, 'index']);
        Route::post('/challenges', [AdminChallengeController::class, 'store']);
        Route::delete('/challenges/{id}', [AdminChallengeController::class, 'destroy']);
    });
});

// Admin authentication routes (public)
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminController::class, 'login']);
    Route::post('/register', [AdminController::class, 'register']);
});

// Test route
Route::get('/test-db', function () {
    try {
        $users = \App\Models\User::all();
        return response()->json([
            'message' => 'Database connection successful',
            'user_count' => $users->count(),
            'users' => $users
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
});
