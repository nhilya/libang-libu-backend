<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\Programme;
use App\Models\Recommendation;
use App\RecommendationStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Recommendation>
 */
class RecommendationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lead_id' => Lead::factory(),
            'programme_id' => Programme::factory(),
            'explanation' => fake()->paragraph(),
            'warnings' => [],
            'status' => RecommendationStatus::Draft,
        ];
    }
}
