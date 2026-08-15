<?php

use App\Models\Contact;
use App\Models\Lead;
use App\Models\School;

test('smart trip planner creates structured customer and lead records', function () {
    $response = $this->postJson(route('api.leads.store'), [
        'school_name' => 'SMK Smart Planner',
        'school_type' => 'government',
        'school_level' => 'secondary',
        'school_location' => 'Kuala Lumpur',
        'contact_name' => 'Teacher Aisyah',
        'contact_role' => 'Trip Coordinator',
        'contact_phone' => '+60123456789',
        'contact_email' => 'aisyah@example.test',
        'student_count' => 90,
        'duration_days' => 2,
        'duration_nights' => 1,
        'learning_interests' => ['science', 'history'],
        'experience_preferences' => ['hands_on', 'outdoor'],
        'budget_min' => 200,
        'budget_max' => 250,
        'learning_objective' => 'A fun geography-focused trip.',
    ]);

    $response->assertCreated()
        ->assertJsonPath('data.status', 'new')
        ->assertJsonPath('data.student_count', 90);

    expect(School::query()->count())->toBe(1)
        ->and(Contact::query()->count())->toBe(1)
        ->and(Lead::query()->sole()->source)->toBe('website');
});

test('smart planner rejects invalid trip requirements', function () {
    $this->postJson(route('api.leads.store'), [
        'school_name' => 'SMK Invalid',
        'school_level' => 'secondary',
        'contact_name' => 'Teacher Test',
        'contact_phone' => '123',
        'contact_email' => 'invalid',
        'student_count' => 0,
        'duration_days' => 1,
        'duration_nights' => 1,
        'learning_interests' => [],
    ])->assertUnprocessable()
        ->assertJsonValidationErrors(['contact_email', 'student_count', 'duration_nights', 'learning_interests']);
});
