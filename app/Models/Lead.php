<?php

namespace App\Models;

use App\LeadStatus;
use Database\Factories\LeadFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable([
    'reference', 'school_id', 'contact_id', 'assigned_to', 'source', 'status', 'school_level',
    'student_count', 'duration_days', 'duration_nights', 'learning_interests',
    'experience_preferences', 'budget_min', 'budget_max', 'learning_objective',
    'indicative_price', 'next_follow_up_at', 'notes',
])]
class Lead extends Model
{
    /** @use HasFactory<LeadFactory> */
    use HasFactory;

    protected $attributes = [
        'source' => 'admin',
        'status' => 'new',
        'duration_days' => 1,
        'duration_nights' => 0,
    ];

    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return BelongsTo<Contact, $this> */
    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    /** @return BelongsTo<User, $this> */
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /** @return HasOne<Recommendation, $this> */
    public function recommendation(): HasOne
    {
        return $this->hasOne(Recommendation::class);
    }

    protected function casts(): array
    {
        return [
            'status' => LeadStatus::class,
            'learning_interests' => 'array',
            'experience_preferences' => 'array',
            'budget_min' => 'decimal:2',
            'budget_max' => 'decimal:2',
            'indicative_price' => 'decimal:2',
            'next_follow_up_at' => 'datetime',
        ];
    }
}
