<?php

namespace App\Models;

use App\Enums\TermStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Term extends Model
{
    /** @use HasFactory<\Database\Factories\TermFactory> */
    use HasFactory;

    protected $fillable = [
        'uuid',
        'category_id',
        'term',
        'definition',
        'provenance',
        'provenance_uri',
        'discussion_url',
        'note',
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

    public function vocabulary() : BelongsTo
    {
        return $this->belongsTo(Vocabulary::class);
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
