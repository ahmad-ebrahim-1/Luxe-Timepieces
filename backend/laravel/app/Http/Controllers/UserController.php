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
        // Retrieve all users from the database
    
        $users = User::all();

        // Return the users as a JSON response
        return response()->json($users, 200);
    }

    public function destroy($id)
    {
        // Ensure the user is authenticated
        $authenticatedUser = Auth::user();

        if (!$authenticatedUser) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Find the user to delete
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check if the authenticated user has permission to delete the user
        // Adjust this condition as per your authorization logic
        if ($authenticatedUser->userType !== "admin") {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Delete the user
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function updateUserType(Request $request, $id)
    {
        // Ensure the user is authenticated
        $authenticatedUser = Auth::user();

        if (!$authenticatedUser) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Find the user to update
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validate the user type
        $request->validate([
            'userType' => 'required|in:admin,user',
        ]);

        // Update the user type
        $user->userType = $request->input('userType');
        $user->save();

        return response()->json(['message' => 'User type updated successfully', 'user' => $user], 200);
    }
}
