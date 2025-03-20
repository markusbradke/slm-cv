<?php

namespace App\Http\Controllers\API\V1;

use App\Filters\StatusFilter;
use App\Filters\TermSearchFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\IndexTermRequest;
use App\Models\Term;
use App\Models\Vocabulary;
use App\Services\JsonLdTransformer;
use Illuminate\Support\Facades\Pipeline;
use OpenApi\Attributes as OA;

class TermVocabularyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/vocabularies/{uuid}/terms',
        summary: "List terms by vocabulary",
        tags: ['terms', 'vocabularies'],
        operationId: 'indexTermVocabularies',
        parameters: [
            new OA\Parameter(
                parameter: 'id',
                name: 'uuid',
                in: 'path',
                description: 'ID',
                required: true,
                schema: new OA\Schema(
                    type: 'string',
                    format: 'string',
                )
            ),
            new OA\Parameter(ref: '#/components/parameters/search'),
            new OA\Parameter(ref: '#/components/parameters/page'),
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
                    ),
                    new OA\MediaType(
                        'application/vnd.ld+json',
                        schema: new OA\Schema(
                            ref: '#/components/schemas/Term'
                        )
                    )
                ]
            ),
        ]
    )]
    public function index(IndexTermRequest $request, Vocabulary $vocabulary)
    {
        $perPage = $request->input('per_page', 10);

        $terms = Pipeline::send(
            Term::with('vocabulary')
                ->where('vocabulary_id', $vocabulary->id)
                ->orderBy('name')
            )
            ->through([
                StatusFilter::class,
                TermSearchFilter::class,
            ])
            ->thenReturn()
            ->paginate($perPage);

        $properties = ['name', 'uuid', 'definition', 'provenance', 'provenance_uri', 'discussion_url', 'notes', 'status'];

        // Return JSON-LD if requested, otherwise return normal JSON
        if ($request->header('Accept') === 'application/vnd.ld+json') {
            return response()->json(JsonLdTransformer::transform($terms, 'Term', $properties, [
                'vocabulary' => optional($terms->first())->vocabulary->name ?? 'Unknown',
            ]), 200, ['Content-Type' => 'application/ld+json']);
        }

        return response()->json($terms);
    }
}
