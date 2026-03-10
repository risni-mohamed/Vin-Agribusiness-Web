<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    /**
     * Handle an incoming request.
     * Redirect to admin login if not authenticated via session.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->session()->get('admin_authenticated')) {
            return redirect('/admin')->with('error', 'Please log in to access the admin panel.');
        }

        return $next($request);
    }
}
