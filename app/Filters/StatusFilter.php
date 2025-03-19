<?php

namespace App\Filters;

use Closure;

class StatusFilter
{
    public function handle($query, Closure $next)
    {
        $status = request()->input('status');

        if ($status) {
            $query->where('status', $status);
        }

        return $next($query);
    }
}
