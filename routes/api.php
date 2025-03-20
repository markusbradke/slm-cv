<?php

use App\Http\Controllers\API\V1\TermController;
use App\Http\Controllers\API\V1\TermVocabularyController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'v1',
    'as' => 'api.',
  ], function () {
    Route::apiResource('/terms', TermController::class);
    Route::apiResource('/vocabularies/{vocabulary}/terms', TermVocabularyController::class);
});
