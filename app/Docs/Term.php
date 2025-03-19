<?php

namespace App\Docs;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'Term',
    description: 'Term schema',
)]
class Term
{
    #[OA\Property(
        title: 'ID',
        description: 'ID',
        type: 'integer',
        format: 'int64'
    )]
    public $id;

    #[OA\Property(
        title: 'Term name',
        description: 'Name of the term',
        type: 'string',
        format: 'string',
        nullable: false
    )]
    public $name;

    #[OA\Property(
        title: 'Term definition',
        description: 'Definition of the term',
        type: 'string',
        format: 'string',
        nullable: true
    )]
    public $definition;

    #[OA\Property(
        title: 'Created at',
        description: 'Timestamp of creation',
        example: '2023-08-23 14:39:37',
        type: 'string',
        format: 'datetime',
        nullable: true
    )]
    public $createdAt;
    
    #[OA\Property(
        title: 'Updated at',
        description: 'Timestamp of last update',
        example: '2023-08-23 14:39:37',
        type: 'string',
        format: 'datetime',
        nullable: true
    )]
    public $updatedAt;
}
