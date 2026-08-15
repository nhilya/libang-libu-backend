<?php

namespace App\Models;

use App\RecordStatus;
use Database\Factories\LearningOutcomeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['code', 'description', 'subject', 'level', 'status'])]
class LearningOutcome extends Model
{
    /** @use HasFactory<LearningOutcomeFactory> */
    use HasFactory;

    protected $attributes = ['status' => 'active'];

    /** @return BelongsToMany<Activity, $this> */
    public function activities(): BelongsToMany
    {
        return $this->belongsToMany(Activity::class);
    }

    protected function casts(): array
    {
        return ['status' => RecordStatus::class];
    }
}
