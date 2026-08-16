<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('authenticated staff can view the trip operations mock', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.operations.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/operations/index')
            ->where('trip.reference', 'LLT-2026-0184')
            ->where('metrics.readiness', 60)
            ->has('checklist', 10)
            ->has('itinerary', 4));
});

test('authenticated staff can view the operational report mock', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.reports.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/reports/index')
            ->where('commercial.payment_status', 'Deposit paid')
            ->has('checklist', 10));
});

test('authenticated staff can preview the client quotation email', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.email-preview.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/email-preview/index')
            ->where('email.recipient_email', 'aminah@smkrajaperempuan.edu.my')
            ->where('email.meeting_date', '20 August 2026')
            ->where('commercial.quotation_total', 19600)
            ->has('itinerary', 4));
});
