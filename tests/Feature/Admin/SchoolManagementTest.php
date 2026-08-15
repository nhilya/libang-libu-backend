<?php

use App\Models\School;
use App\Models\User;

test('sales staff can create and update a school', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('admin.schools.store'), [
        'name' => 'SMK ABC',
        'type' => 'government',
        'level' => 'secondary',
        'location' => 'Ipoh',
    ]);

    $school = School::query()->sole();
    $response->assertRedirect(route('admin.schools.show', $school));

    $this->actingAs($user)->put(route('admin.schools.update', $school), [
        'name' => 'SMK ABC Ipoh',
        'type' => 'government',
        'level' => 'secondary',
        'location' => 'Ipoh',
    ])->assertRedirect(route('admin.schools.show', $school));

    expect($school->fresh()->name)->toBe('SMK ABC Ipoh');
});
