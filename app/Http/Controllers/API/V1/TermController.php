<?php

namespace App\Http\Controllers\API\V1;

use App\Filters\StatusFilter;
use App\Filters\TermSearchFilter;
use App\Filters\VocabularyFilter;
use App\Http\Controllers\Controller;
use App\Models\Term;
use App\Models\Vocabulary;
use Illuminate\Support\Facades\Pipeline;
use OpenApi\Attributes as OA;

class TermController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/terms',
        summary: "List terms",
        // tags: ['resources'],
        operationId: 'indexTerms',
        parameters: [
            new OA\Parameter(ref: '#/components/parameters/search'),
            new OA\Parameter(ref: '#/components/parameters/per_page'),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'OK',
                content: [
                    new OA\JsonContent(
                        type: 'object',
                        properties: [
                            new OA\Property(
                                property: 'data',
                                type: 'array',
                                items: new OA\Items(
                                    ref: '#/components/schemas/Term'
                                )
                            )
                        ]
                    )
                ]
            ),
        ]
    )]
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

        return $terms;
    }

    public function show(Term $term)
    {
        return $term->load('vocabulary');
    }
}
