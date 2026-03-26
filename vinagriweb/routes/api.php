<?php

use App\Http\Controllers\FertilizerController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\CropProgramController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('fertilizers', FertilizerController::class);
Route::apiResource('crop-programs', CropProgramController::class);
Route::apiResource('media', MediaController::class)->parameters([
    'media' => 'media'
]);
Route::get('feedbacks/public', [FeedbackController::class, 'publicIndex']);
Route::apiResource('feedbacks', FeedbackController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
