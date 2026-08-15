<?php

use App\LeadStatus;
use App\Models\Lead;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('authenticated staff can view operational dashboard metrics', function () {
    $user = User::factory()->create();
    Lead::factory()->count(2)->create(['status' => LeadStatus::New]);

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('metrics.new_enquiries', 2)
            ->has('actions')
            ->has('recentLeads', 2));
});
