<?php

use App\Http\Controllers\TermController;
use App\Http\Controllers\VocabularyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('dashboard');
Route::resource('vocabularies', VocabularyController::class);
Route::resource('terms', TermController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
