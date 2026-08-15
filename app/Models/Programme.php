<?php

namespace App\Models;

use App\RecordStatus;
use Database\Factories\ProgrammeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property RecordStatus $status
 * @property list<string>|null $school_levels
 */
#[Fillable([
    'product_id', 'name', 'slug', 'description', 'duration_days', 'duration_nights',
    'school_levels', 'min_group_size', 'max_group_size', 'themes',
    'indicative_price_min', 'indicative_price_max', 'status',
])]
class Programme extends Model
{
    /** @use HasFactory<ProgrammeFactory> */
    use HasFactory;

    protected $attributes = [
        'duration_days' => 1,
        'duration_nights' => 0,
        'status' => 'draft',
    ];

    /** @return BelongsTo<Product, $this> */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /** @return BelongsToMany<Activity, $this> */
    public function activities(): BelongsToMany
    {
        return $this->belongsToMany(Activity::class)
            ->withPivot(['sort_order', 'is_required'])
            ->orderByPivot('sort_order');
    }

    /** @return HasMany<Recommendation, $this> */
    public function recommendations(): HasMany
    {
        return $this->hasMany(Recommendation::class);
    }

    protected function casts(): array
    {
        return [
            'school_levels' => 'array',
            'themes' => 'array',
            'indicative_price_min' => 'decimal:2',
            'indicative_price_max' => 'decimal:2',
            'status' => RecordStatus::class,
        ];
    }
}
