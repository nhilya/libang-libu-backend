<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Programme;
use App\RecordStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Programme>
 */
class ProgrammeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'name' => fake()->unique()->words(3, true),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraph(),
            'duration_days' => 2,
            'duration_nights' => 1,
            'school_levels' => ['secondary'],
            'min_group_size' => 30,
            'max_group_size' => 120,
            'themes' => ['science', 'history', 'geography'],
            'indicative_price_min' => 200,
            'indicative_price_max' => 300,
            'status' => RecordStatus::Active,
        ];
    }
}
