<?php

namespace App\Filters;

use Closure;

class VocabularyFilter
{
    public function handle($query, Closure $next)
    {
        // Get the vocabulary from request
        $category = request()->input('vocabulary');

        // Apply filter only if vocabulary is provided
        if ($category) {
            $query->whereHas('vocabulary', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }

        return $next($query);
    }
}
