<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        return response()->json(Auth::user());
    }

    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function destroy($id)
    {
        $authenticatedUser = Auth::user();

        if (!$authenticatedUser) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if ($authenticatedUser->id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function updateUserType(Request $request, $id)
    {
        $authenticatedUser = Auth::user();

        if (!$authenticatedUser) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $request->validate([
            'userType' => 'required|in:admin,user',
        ]);
        $user->userType = $request->input('userType');
        $user->save();
        return response()->json(['message' => 'User type updated successfully', 'user' => $user], 200);
    }
}
