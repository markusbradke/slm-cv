<?php

namespace App\Http\Controllers;

use App\Filters\StatusFilter;
use App\Filters\TermSearchFilter;
use App\Filters\VocabularyFilter;
use App\Http\Requests\StoreTermRequest;
use App\Http\Requests\UpdateTermRequest;
use App\Models\Term;
use App\Models\Vocabulary;
use Illuminate\Support\Facades\Gate;
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
            StatusFilter::class,
            TermSearchFilter::class,
            VocabularyFilter::class,
        ])
            ->thenReturn()
            ->paginate(20);

        $vocabularies = Vocabulary::orderBy('name')->get();

        return Inertia::render('terms/index', [
            'terms' => $terms,
            'vocabularies' => $vocabularies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $vocabularies = Vocabulary::orderBy('name')->get();

        return Inertia::render('terms/create', [
            'vocabularies' => $vocabularies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTermRequest $request)
    {
        Gate::authorize('create', Term::class);
        Term::create($request->validated());
        
        return redirect()->route('terms.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Term $term)
    {
        return Inertia::render('terms/show', [
            'term' => $term->load('vocabulary'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Term $term)
    {
        $vocabularies = Vocabulary::orderBy('name')->get();

        return Inertia::render('terms/edit', [
            'term' => $term->load('vocabulary'),
            'vocabularies' => $vocabularies,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTermRequest $request, Term $term)
    {
        Gate::authorize('update', $term);
        $term->update($request->validated());

        return redirect()->route('terms.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Term $term)
    {
        Gate::authorize('update', $term);
        $term->delete();

        return redirect()->route('terms.index');
    }
}
