<?php

namespace App\Docs;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'Vocabulary',
    description: 'Vocabulary schema',
)]
class Vocabulary
{
    #[OA\Property(
        title: 'ID',
        description: 'ID',
        type: 'integer',
        format: 'int64'
    )]
    public $id;

    #[OA\Property(
        title: 'Vocabulary name',
        description: 'Name of the vocabulary',
        type: 'string',
        format: 'string',
        nullable: false
    )]
    public $name;

    #[OA\Property(
        title: 'Vocabulary slug',
        description: 'Slug of the vocabulary',
        type: 'string',
        format: 'string',
        nullable: false
    )]
    public $slug;

    #[OA\Property(
        title: 'Vocabulary description',
        description: 'Description of the vocabulary',
        type: 'string',
        format: 'string',
        nullable: true
    )]
    public $description;

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
