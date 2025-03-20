<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class JsonLdTransformer
{
    /**
     * Transform a model, collection of models, or paginator into JSON-LD format.
     * Accepts an array of properties to include in the transformation.
     */
    public static function transform($models, string $modelType = 'Thing', array $properties = [], array $additionalAttributes = []): array
    {
        // If $models is a paginator, handle the collection of items inside it
        if ($models instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            return self::transformCollection($models->getCollection(), $modelType, $properties, $additionalAttributes);
        }

        // If it's a collection, transform it
        if ($models instanceof Collection) {
            return self::transformCollection($models, $modelType, $properties, $additionalAttributes);
        }

        // Otherwise, assume it's a single model instance
        return self::transformSingleModel($models, $modelType, $properties, $additionalAttributes);
    }

    /**
     * Transform a collection of models into JSON-LD format.
     */
    public static function transformCollection(Collection $models, string $modelType, array $properties, array $additionalAttributes): array
    {
        return [
            '@context' => 'https://schema.org',
            '@graph' => $models->map(fn($model) => self::transformSingleModel($model, $modelType, $properties, $additionalAttributes))->toArray(),
        ];
    }

    /**
     * Transform a single model into JSON-LD format.
     */
    public static function transformSingleModel(Model $model, string $modelType, array $properties, array $additionalAttributes): array
    {
        // Get model attributes dynamically
        $attributes = $model->getAttributes();
        
        // Merge additional attributes (e.g., custom attributes you want to add to JSON-LD)
        $attributes = array_merge($attributes, $additionalAttributes);

        // Get the model's route name dynamically
        $modelClass = get_class($model);
        $modelName = strtolower(class_basename($modelClass));
        $routeName = Str::plural($modelName) . '.show';

        // Prepare JSON-LD output
        $jsonLdData = [
            '@type' => $modelType,
        ];

        // Add dynamic properties from the provided array of properties
        foreach ($properties as $property) {
            if (isset($attributes[$property])) {
                $jsonLdData[$property] = $attributes[$property];
            } else {
                $jsonLdData[$property] = null;
            }
        }

        $jsonLdData['identifier'] = $model->uuid;
        $jsonLdData['url'] = route($routeName, $model);

        // Optionally add relationships if needed
        if ($model->relationLoaded('vocabulary') && $model->vocabulary) {
            $jsonLdData['vocabulary'] = $model->vocabulary->name;
        }

        return $jsonLdData;
    }
}
