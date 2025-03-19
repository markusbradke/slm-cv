<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiResource;
use App\Enums\TermStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use OwenIt\Auditing\Contracts\Auditable;

class Term extends Model implements Auditable
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
        'uuid',
        'vocabulary_id',
        'name',
        'definition',
        'provenance',
        'provenance_uri',
        'discussion_url',
        'notes',
        'status',
    ];

    /**
     * Attributes to include in the Audit.
     *
     * @var array
     */
    protected $auditInclude = [
        'vocabulary_id',
        'name',
        'definition',
        'provenance',
        'provenance_uri',
        'discussion_url',
        'notes',
        'status',
    ];

    public $casts = [
        'status' => TermStatus::class,
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }

    public function vocabulary(): BelongsTo
    {
        return $this->belongsTo(Vocabulary::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, fn ($query, $search) => $query
            ->where('name', 'ilike', "%$search%")
            ->orWhere('definition', 'ilike', "%$search%")
        );
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
