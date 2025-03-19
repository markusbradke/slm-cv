<?php

namespace App\Filters;

use Closure;

class VocabularyFilter
{
    public function handle($query, Closure $next)
    {
        $category = request()->input('vocabulary');

        if ($category) {
            $query->whereHas('vocabulary', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }

        return $next($query);
    }
}
