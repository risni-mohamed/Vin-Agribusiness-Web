<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Handle admin login form submission.
     * Validates credentials against environment variables.
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $adminUsername = config('admin.username');
        $adminPasswordHash = config('admin.password_hash');

        $usernameMatches = $request->username === $adminUsername;
        $passwordMatches = $adminPasswordHash
            ? Hash::check($request->password, $adminPasswordHash)
            : ($request->password === config('admin.password'));

        if ($usernameMatches && $passwordMatches) {
            $request->session()->put('admin_authenticated', true);
            $request->session()->regenerate();
            return response()->json(['success' => true]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid username or password.'
        ], 401);
    }

    /**
     * Handle admin logout — destroy the session.
     */
    public function logout(Request $request)
    {
        $request->session()->forget('admin_authenticated');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin');
    }

    /**
     * Check if admin is currently authenticated (for frontend polling).
     */
    public function checkAuth(Request $request)
    {
        return response()->json([
            'authenticated' => (bool) $request->session()->get('admin_authenticated')
        ]);
    }
}
