<?php

namespace App\Models;

use App\RecordStatus;
use Database\Factories\ActivityFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property RecordStatus $status
 * @property list<string>|null $school_levels
 */
#[Fillable([
    'location_id', 'name', 'slug', 'category', 'learning_themes', 'school_levels',
    'min_age', 'max_age', 'duration_minutes', 'maximum_capacity', 'minimum_capacity',
    'environment', 'suggested_time', 'operating_hours', 'weather_sensitive',
    'base_cost', 'status', 'notes',
])]
class Activity extends Model
{
    /** @use HasFactory<ActivityFactory> */
    use HasFactory;

    protected $attributes = [
        'weather_sensitive' => false,
        'status' => 'draft',
    ];

    /** @return BelongsTo<Location, $this> */
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    /** @return BelongsToMany<Programme, $this> */
    public function programmes(): BelongsToMany
    {
        return $this->belongsToMany(Programme::class)
            ->withPivot(['sort_order', 'is_required']);
    }

    /** @return BelongsToMany<LearningOutcome, $this> */
    public function learningOutcomes(): BelongsToMany
    {
        return $this->belongsToMany(LearningOutcome::class);
    }

    /** @return BelongsToMany<Recommendation, $this> */
    public function recommendations(): BelongsToMany
    {
        return $this->belongsToMany(Recommendation::class)
            ->withPivot('sort_order');
    }

    protected function casts(): array
    {
        return [
            'learning_themes' => 'array',
            'school_levels' => 'array',
            'operating_hours' => 'array',
            'weather_sensitive' => 'boolean',
            'base_cost' => 'decimal:2',
            'status' => RecordStatus::class,
        ];
    }
}
