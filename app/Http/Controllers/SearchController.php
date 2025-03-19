<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Term;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'query' => ['required', 'string', 'min:2'],
        ]);

        $searchQuery = $validated['query'];
        $terms = Term::filter(['search' => $searchQuery])
            ->with('vocabulary')
            ->get();

        return response()->json(['terms' => $terms]);
    }
}