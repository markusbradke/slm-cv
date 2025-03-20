<?php

namespace App\Http\Controllers\API\V1;

use App\Filters\VocabularySearchFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\IndexVocabularyRequest;
use App\Models\Vocabulary;
use App\Services\JsonLdTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Pipeline;
use OpenApi\Attributes as OA;

class VocabularyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/vocabularies',
        summary: "List vocabularies",
        tags: ['vocabularies'],
        operationId: 'indexVocabularies',
        parameters: [
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
                                    ref: '#/components/schemas/Vocabulary'
                                )
                            )
                        ]
                    ),
                    new OA\MediaType(
                        'application/vnd.ld+json',
                        schema: new OA\Schema(
                            ref: '#/components/schemas/Vocabulary'
                        )
                    )
                ]
            ),
        ]
    )]
    public function index(IndexVocabularyRequest $request)
    {
        $perPage = $request->input('per_page', 10);

        $vocabularies = Pipeline::send(
            Vocabulary::orderBy('name')
            )
            ->through([
                VocabularySearchFilter::class,
            ])
            ->thenReturn()
            ->paginate($perPage);

        $properties = ['name', 'uuid', 'slug', 'description'];

        // Return JSON-LD if requested, otherwise return normal JSON
        if ($request->header('Accept') === 'application/vnd.ld+json') {
            return response()->json(JsonLdTransformer::transform($vocabularies, 'Vocabulary', $properties), 200, ['Content-Type' => 'application/ld+json']);
        }

        return response()->json($vocabularies);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
        path: '/vocabularies/{uuid}',
        summary: "Show vocabulary",
        tags: ['vocabularies'],
        operationId: 'showVocabulary',
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
            )
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
                                    ref: '#/components/schemas/Vocabulary'
                                )
                            )
                        ]
                    ),
                    new OA\MediaType(
                        'application/vnd.ld+json',
                        schema: new OA\Schema(
                            ref: '#/components/schemas/Vocabulary'
                        )
                    )
                ]
            ),
        ]
    )]
    public function show(Vocabulary $vocabulary, Request $request)
    {
        $properties = ['name', 'uuid', 'slug', 'description'];

        // Return JSON-LD if requested, otherwise return normal JSON
        if ($request->header('Accept') === 'application/vnd.ld+json') {
            return response()->json(JsonLdTransformer::transform($vocabulary, 'Vocabulary', $properties), 200, ['Content-Type' => 'application/ld+json']);
        }
        
        return response()->json($vocabulary);
    }
}
