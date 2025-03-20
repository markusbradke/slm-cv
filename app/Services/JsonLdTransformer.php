<?php

namespace App\Services;

use App\Models\Term;

class JsonLdTransformer
{
    /**
     * Transform a collection of terms or a single term into JSON-LD format.
     */
    public static function transform($terms): array
    {
        // Check if $terms is a paginator (i.e., paginated results)
        if ($terms instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            // If it's a paginator, get the actual terms collection and pass it to transformTerms
            return self::transformTerms($terms->getCollection());
        }
        
        // Check if $terms is a collection (for multiple terms) or a single term
        if ($terms instanceof \Illuminate\Database\Eloquent\Collection) {
            // If a collection of terms, map each term
            return self::transformTerms($terms);
        }

        // If a single term, process it directly
        return self::transformTerm($terms);
    }

    /**
     * Transform a collection of terms into JSON-LD format.
     */
    public static function transformTerms($terms): array
    {
        return [
            '@context' => 'https://schema.org',
            '@graph' => $terms->map(fn($term) => self::transformTerm($term))->toArray(),
        ];
    }

    /**
     * Transform a single term into JSON-LD format.
     */
    public static function transformTerm(Term $term): array
    {
        $type = optional($term->vocabulary)->name ?? 'Thing';

        return [
            '@type' => $type,
            'name' => $term->name,
            'definition' => $term->definition,
            'provenance' => $term->provenance,
            'provenance_uri' => $term->provenance_uri,
            'discussion_url' => $term->discussion_url,
            'notes' => $term->notes,
            'status' => $term->status,
            'identifier' => $term->uuid,
            'url' => route('terms.show', $term),
        ];
    }
}
