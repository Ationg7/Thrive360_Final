<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::where('user_id', auth()->id())
            ->orderBy('priority', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'priority' => 'nullable|integer|in:1,2,3'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $todo = Todo::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'priority' => $request->priority ?? Todo::PRIORITY_LOW
        ]);

        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:1000',
            'priority' => 'sometimes|integer|in:1,2,3',
            'is_completed' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updateData = $request->only(['title', 'description', 'priority', 'is_completed']);
        
        if (isset($updateData['is_completed']) && $updateData['is_completed']) {
            $updateData['completed_at'] = now();
        } elseif (isset($updateData['is_completed']) && !$updateData['is_completed']) {
            $updateData['completed_at'] = null;
        }

        $todo->update($updateData);

        return response()->json($todo);
    }

    public function destroy($id)
    {
        $todo = Todo::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully']);
    }

    public function toggleComplete($id)
    {
        $todo = Todo::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        if ($todo->is_completed) {
            $todo->markAsPending();
        } else {
            $todo->markAsCompleted();
        }

        return response()->json($todo);
    }
}
