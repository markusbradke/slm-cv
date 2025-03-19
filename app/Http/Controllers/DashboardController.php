<?php

namespace App\Http\Controllers;

use App\Models\Term;
use App\Models\Vocabulary;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        
        return Inertia::render('dashboard', [
            'terms_count' => Term::count(),
            'vocabularies_count' => Vocabulary::count(),
        ]);
    }
}
