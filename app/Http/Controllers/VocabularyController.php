<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVocabularyRequest;
use App\Http\Requests\UpdateVocabularyRequest;
use App\Models\Vocabulary;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class VocabularyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vocabularies = Vocabulary::withCount('terms')
            ->orderBy('name')
            ->get();

        return Inertia::render('vocabularies/index', [
            'vocabularies' => $vocabularies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('vocabularies/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVocabularyRequest $request)
    {
        Gate::authorize('create', Vocabulary::class);
        Vocabulary::create($request->validated());

        return redirect()->route('vocabularies.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vocabulary $vocabulary)
    {
        return Inertia::render('vocabularies/show', [
            'vocabulary' => $vocabulary->loadCount('terms'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vocabulary $vocabulary)
    {
        return Inertia::render('vocabularies/edit', [
            'vocabulary' => $vocabulary,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVocabularyRequest $request, Vocabulary $vocabulary)
    {
        Gate::authorize('update', $vocabulary);
        $vocabulary->update($request->validated());
        
        return redirect()->route('vocabularies.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vocabulary $vocabulary)
    {
        Gate::authorize('delete', $vocabulary);
        $vocabulary->delete();

        return redirect()->route('vocabularies.index');
    }
}
