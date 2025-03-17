<?php

namespace App\Http\Controllers;

use App\Filters\VocabularyFilter;
use App\Http\Requests\StoreTermRequest;
use App\Http\Requests\UpdateTermRequest;
use App\Models\Term;
use Illuminate\Support\Facades\Pipeline;
use Inertia\Inertia;

class TermController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $terms = Pipeline::send(
                Term::with('vocabulary')
                    ->orderBy('name')
            )
            ->through([
                VocabularyFilter::class,
            ])
            ->thenReturn()
            ->paginate(5);

        return Inertia::render('terms/index', [
            'terms' => $terms,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('terms/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTermRequest $request)
    {
        Term::create($request->validated());
        return redirect()->route('terms.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Term $term)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Term $term)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTermRequest $request, Term $term)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Term $term)
    {
        $term->delete();

        return redirect()->route('terms.index');
    }
}
