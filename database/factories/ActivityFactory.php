<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\Location;
use App\RecordStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'location_id' => Location::factory(),
            'name' => fake()->unique()->words(4, true),
            'slug' => fake()->unique()->slug(),
            'category' => fake()->randomElement(['science', 'history', 'geography']),
            'learning_themes' => ['hands_on', 'discovery'],
            'school_levels' => ['primary', 'secondary'],
            'duration_minutes' => fake()->randomElement([60, 90, 120]),
            'maximum_capacity' => fake()->randomElement([30, 60, 120]),
            'environment' => fake()->randomElement(['indoor', 'outdoor', 'mixed']),
            'weather_sensitive' => fake()->boolean(),
            'base_cost' => fake()->randomFloat(2, 100, 1500),
            'status' => RecordStatus::Active,
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
