<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use OwenIt\Auditing\Contracts\Auditable;

class Vocabulary extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    /** @use HasFactory<\Database\Factories\TermFactory> */
    use HasFactory;

    /**
     * Attributes to be mass fillable.
     *
     * @var array
     */
    protected $fillable = [
        'slug',
        'name',
        'description',
        'uuid',
    ];

    /**
     * Attributes to include in the Audit.
     *
     * @var array
     */
    protected $auditInclude = [
        'slug',
        'name',
        'description',
    ];

    public function terms(): HasMany
    {
        return $this->hasMany(Term::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, fn ($query, $search) => $query
            ->where('name', 'ilike', "%$search%")
            ->orWhere('description', 'ilike', "%$search%")
        );
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
