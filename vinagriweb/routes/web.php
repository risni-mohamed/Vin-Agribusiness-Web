<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;


// Public Frontend Routes
Route::get('/', function () {
    return Inertia::render('Frontend/Home');
});

Route::get('/about', function () {
    return Inertia::render('Frontend/About');
});

Route::get('/contact', function () {
    return Inertia::render('Frontend/Contact');
});

Route::get('/media', function () {
    return Inertia::render('Frontend/Media');
});

Route::get('/fertilizer', function () {
    return Inertia::render('Frontend/Fertilizers');
});

// Redirect plural to singular for backward compatibility
Route::get('/fertilizers', function () {
    return redirect('/fertilizer');
});
Route::get('/fertilizers/{any}', function ($any) {
    return redirect('/fertilizer/' . $any);
})->where('any', '.*');

Route::get('/fertilizer/products', function () {
    return Inertia::render('Frontend/FertilizerProducts');
});

Route::get('/fertilizer/{id}', function ($id) {
    return Inertia::render('Frontend/FertilizerProductDetails', ['id' => $id]);
});

Route::get('/fertilizer/dealership', function () {
    return Inertia::render('Frontend/DealershipAgreement');
});

// Admin Panel Routes
Route::prefix('admin')->group(function () {
    // Public: Login page & auth endpoints
    Route::get('/', function () {
        return Inertia::render('Admin/Login');
    });

    Route::post('/login', [AdminController::class, 'login']);
    Route::get('/logout', [AdminController::class, 'logout']);
    Route::get('/auth/check', [AdminController::class, 'checkAuth']);

    // Protected: All admin panel pages require AdminAuth
    Route::middleware(['admin.auth'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        });

        Route::get('/add-product/fertilizers', function () {
            return Inertia::render('Admin/AddFertilizers');
        });

        Route::get('/view-products/fertilizers', function () {
            return Inertia::render('Admin/ViewFertilizers');
        });

        Route::get('/add-media', function () {
            return Inertia::render('Admin/AddMedia');
        });

        Route::get('/view-media', function () {
            return Inertia::render('Admin/ViewMedia');
        });

        Route::get('/dealership-agreement', function () {
            return Inertia::render('Admin/DealershipAgreement');
        });

        Route::get('/view-feedbacks', function () {
            return Inertia::render('Admin/ViewFeedbacks');
        });
    });
});

Route::get('/seeds', function () {
    return Inertia::render('Frontend/Seeds');
});

Route::get('/vin-plastics', function () {
    return Inertia::render('Frontend/VinPlastics');
});

Route::get('/vin-apparel', function () {
    return Inertia::render('Frontend/VinApparel');
});

