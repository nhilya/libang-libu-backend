<?php

use App\Models\Activity;
use App\Models\Lead;
use App\Models\Programme;
use App\Models\Recommendation;
use App\Models\User;
use App\RecommendationStatus;

test('recommendation review validates programme and activity capacity', function () {
    $user = User::factory()->create();
    $lead = Lead::factory()->create(['student_count' => 90, 'school_level' => 'secondary']);
    $programme = Programme::factory()->create(['school_levels' => ['secondary'], 'max_group_size' => 120]);
    $activity = Activity::factory()->create(['school_levels' => ['secondary'], 'maximum_capacity' => 30]);

    $this->actingAs($user)->put(route('admin.leads.recommendation.store', $lead), [
        'programme_id' => $programme->id,
        'activity_ids' => [$activity->id],
        'explanation' => 'Strong learning match.',
    ])->assertRedirect(route('admin.leads.show', $lead));

    $recommendation = Recommendation::query()->sole();

    expect($recommendation->status)->toBe(RecommendationStatus::Invalid)
        ->and($recommendation->warnings)->toHaveCount(1)
        ->and($recommendation->warnings[0]['severity'])->toBe('critical');
});

test('a feasible recommendation is marked valid', function () {
    $user = User::factory()->create();
    $lead = Lead::factory()->create(['student_count' => 60, 'school_level' => 'secondary', 'budget_max' => 300]);
    $programme = Programme::factory()->create(['school_levels' => ['secondary'], 'min_group_size' => 30, 'max_group_size' => 120, 'indicative_price_min' => 200]);
    $activity = Activity::factory()->create(['school_levels' => ['secondary'], 'maximum_capacity' => 120]);

    $this->actingAs($user)->put(route('admin.leads.recommendation.store', $lead), [
        'programme_id' => $programme->id,
        'activity_ids' => [$activity->id],
    ])->assertRedirect();

    expect(Recommendation::query()->sole()->status)->toBe(RecommendationStatus::Valid);
});
