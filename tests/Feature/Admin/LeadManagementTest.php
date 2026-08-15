<?php

use App\Models\Lead;
use App\Models\School;
use App\Models\User;
use App\UserRole;
use Inertia\Testing\AssertableInertia as Assert;

test('sales staff can create a structured lead', function () {
    $user = User::factory()->create();
    $school = School::factory()->create();

    $response = $this->actingAs($user)->post(route('admin.leads.store'), [
        'school_id' => $school->id,
        'assigned_to' => $user->id,
        'source' => 'website',
        'status' => 'new',
        'school_level' => 'secondary',
        'student_count' => 90,
        'duration_days' => 2,
        'duration_nights' => 1,
        'learning_interests' => ['science', 'geography'],
        'experience_preferences' => ['hands_on', 'outdoor'],
        'budget_min' => 200,
        'budget_max' => 250,
        'learning_objective' => 'A fun, hands-on geography trip.',
    ]);

    $lead = Lead::query()->sole();

    $response->assertRedirect(route('admin.leads.show', $lead));
    expect($lead->reference)->toMatch('/^LLT-\d{4}-00001$/')
        ->and($lead->learning_interests)->toBe(['science', 'geography']);
});

test('lead intake enforces operational data integrity', function () {
    $user = User::factory()->create();
    $school = School::factory()->create();

    $this->actingAs($user)->post(route('admin.leads.store'), [
        'school_id' => $school->id,
        'source' => 'website',
        'status' => 'new',
        'school_level' => 'secondary',
        'student_count' => 0,
        'duration_days' => 1,
        'duration_nights' => 1,
        'budget_min' => 300,
        'budget_max' => 200,
    ])->assertInvalid(['student_count', 'duration_nights', 'budget_max']);
});

test('finance staff cannot create sales leads', function () {
    $financeUser = User::factory()->create(['role' => UserRole::Finance]);

    $this->actingAs($financeUser)
        ->get(route('admin.leads.create'))
        ->assertForbidden();
});

test('sales staff can view the lead pipeline', function () {
    $user = User::factory()->create();
    Lead::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.leads.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/leads/index')
            ->has('leads.data', 1));
});
