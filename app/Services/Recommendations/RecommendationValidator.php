<?php

namespace App\Services\Recommendations;

use App\Models\Activity;
use App\Models\Lead;
use App\Models\Programme;
use App\RecommendationStatus;
use App\RecordStatus;
use Illuminate\Database\Eloquent\Collection;

class RecommendationValidator
{
    /**
     * @param  Collection<int, Activity>  $activities
     * @return array{status: RecommendationStatus, warnings: list<array{severity: string, message: string}>}
     */
    public function validate(Lead $lead, Programme $programme, Collection $activities): array
    {
        $warnings = [];

        if ($programme->status !== RecordStatus::Active) {
            $warnings[] = $this->warning('critical', 'The selected programme is not active.');
        }

        if ($programme->school_levels && ! in_array($lead->school_level, $programme->school_levels, true)) {
            $warnings[] = $this->warning('critical', 'The programme is not suitable for this school level.');
        }

        if ($programme->max_group_size && $lead->student_count > $programme->max_group_size) {
            $warnings[] = $this->warning('critical', 'The group exceeds the programme maximum capacity.');
        }

        if ($programme->min_group_size && $lead->student_count < $programme->min_group_size) {
            $warnings[] = $this->warning('warning', 'The group is below the programme minimum size.');
        }

        if ($lead->budget_max && $programme->indicative_price_min && $lead->budget_max < $programme->indicative_price_min) {
            $warnings[] = $this->warning('warning', 'The programme indicative price is above the customer budget.');
        }

        foreach ($activities as $activity) {
            if ($activity->status !== RecordStatus::Active) {
                $warnings[] = $this->warning('critical', "{$activity->name} is not active.");
            }

            if ($lead->student_count > $activity->maximum_capacity) {
                $warnings[] = $this->warning('critical', "{$activity->name} supports {$activity->maximum_capacity} students, below the requested group size.");
            }

            if ($activity->school_levels && ! in_array($lead->school_level, $activity->school_levels, true)) {
                $warnings[] = $this->warning('critical', "{$activity->name} is not suitable for this school level.");
            }
        }

        $hasCritical = collect($warnings)->contains('severity', 'critical');

        return [
            'status' => $hasCritical ? RecommendationStatus::Invalid : ($warnings === [] ? RecommendationStatus::Valid : RecommendationStatus::Warning),
            'warnings' => $warnings,
        ];
    }

    /** @return array{severity: string, message: string} */
    private function warning(string $severity, string $message): array
    {
        return compact('severity', 'message');
    }
}
