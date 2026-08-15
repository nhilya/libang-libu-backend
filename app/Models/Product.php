<?php

namespace App\Models;

use App\RecordStatus;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['company_id', 'name', 'slug', 'description', 'status', 'product_type', 'customer_segment'])]
class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    protected $attributes = ['status' => 'draft'];

    /** @return BelongsTo<Company, $this> */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /** @return HasMany<Programme, $this> */
    public function programmes(): HasMany
    {
        return $this->hasMany(Programme::class);
    }

    protected function casts(): array
    {
        return ['status' => RecordStatus::class];
    }
}
