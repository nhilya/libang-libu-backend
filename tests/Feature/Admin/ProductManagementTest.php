<?php

use App\Models\Activity;
use App\Models\Company;
use App\Models\Location;
use App\Models\Product;
use App\Models\Programme;
use App\Models\User;

test('super admins can build the reusable product catalogue', function () {
    $user = User::factory()->superAdmin()->create();
    $company = Company::factory()->create();

    $this->actingAs($user)->post(route('admin.products.store'), [
        'company_id' => $company->id,
        'name' => 'Ipoh School Outing',
        'slug' => '',
        'description' => 'Educational outings in Ipoh.',
        'status' => 'active',
        'product_type' => 'educational_tour',
        'customer_segment' => 'schools',
    ])->assertRedirect();

    $product = Product::query()->sole();
    expect($product->slug)->toBe('ipoh-school-outing');

    $this->actingAs($user)->post(route('admin.programmes.store'), [
        'product_id' => $product->id,
        'name' => 'Ipoh Discovery Expedition',
        'slug' => '',
        'duration_days' => 2,
        'duration_nights' => 1,
        'school_levels' => ['secondary'],
        'min_group_size' => 60,
        'max_group_size' => 120,
        'themes' => ['science', 'history'],
        'status' => 'active',
    ])->assertRedirect();

    expect(Programme::query()->sole()->themes)->toBe(['science', 'history']);
});

test('operations staff can create capacity-aware activities', function () {
    $user = User::factory()->create(['role' => 'operations']);
    $location = Location::factory()->create();

    $this->actingAs($user)->post(route('admin.activities.store'), [
        'location_id' => $location->id,
        'name' => 'Kek Lok Tong Limestone Investigation',
        'slug' => '',
        'category' => 'science',
        'learning_themes' => ['geography', 'hands_on'],
        'school_levels' => ['secondary'],
        'duration_minutes' => 90,
        'maximum_capacity' => 120,
        'environment' => 'outdoor',
        'weather_sensitive' => true,
        'base_cost' => 800,
        'status' => 'active',
    ])->assertRedirect();

    $activity = Activity::query()->sole();
    expect($activity->maximum_capacity)->toBe(120)
        ->and($activity->weather_sensitive)->toBeTrue();
});
