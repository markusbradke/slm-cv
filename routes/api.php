<?php

use App\Http\Controllers\API\V1\TermController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'v1',
    'as' => 'api.',
  ], function () {
    Route::apiResource('/terms', TermController::class);
    // Route::get('/terms', [TermController::class, 'index'])->name('api.terms.index');
    // Route::get('/terms/{term}', [TermController::class, 'show'])->name('api.terms.show');
});
