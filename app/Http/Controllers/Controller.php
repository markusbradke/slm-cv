<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: 'SLM-CV OpenAPI Documentation',
    version: '1.0.0',
    description: 'This is the OpenAPI specification for the Controlled Vocabulary.',
    license: new OA\License(
        name: 'MIT',
        url: 'https://opensource.org/license/MIT'
    ),
    contact: new OA\Contact(
        name: 'SLM-CV Support',
        email: 'support@igs.org',
        url: L5_SWAGGER_CONST_HOST
    )
)]
#[OA\Server(
    url: L5_SWAGGER_CONST_HOST,
    description: 'SLM-CV API Server'
)]
// Tags
#[OA\Tag(
    name: 'terms',
    description: 'Vocabulary Terms'
)]
// Parameters
#[OA\Parameter(
    name: 'search',
    description: 'Search term',
    required: false,
    in: 'query',
    schema: new OA\Schema(
        type: 'string'
    )
)]
#[OA\Parameter(
    name: 'page',
    description: 'Page number',
    required: false,
    in: 'query',
    schema: new OA\Schema(
        type: 'int',
        example: '1'
    )
)]
#[OA\Parameter(
    name: 'per_page',
    description: 'Number of records per page (Default: 10)',
    required: false,
    in: 'query',
    schema: new OA\Schema(
        type: 'int',
        example: '10'
    )
)]
// Responses
#[OA\Response(
    response: 204,
    description: 'No Content',
)]
#[OA\Response(
    response: 401,
    description: 'Unauthorized',
)]
#[OA\Response(
    response: 403,
    description: 'Forbidden',
)]
#[OA\Response(
    response: 404,
    description: 'Not Found',
)]

abstract class Controller
{
    //
}
