<?php

namespace App\Filters;

use Closure;

class TermSearchFilter
{
    public function handle($query, Closure $next)
    {
        $search = request()->input('search');

        if ($search) {
            $query->filter(['search' => $search]);
        }

        return $next($query);
    }
}
