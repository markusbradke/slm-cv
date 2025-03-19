<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TermController;
use App\Http\Controllers\VocabularyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/contributing', function () {
    return Inertia::render('contributing');
})->name('contributing');
Route::resource('vocabularies', VocabularyController::class);
Route::resource('terms', TermController::class);

Route::get('/search', SearchController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
