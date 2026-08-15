<?php

namespace Database\Factories;

use App\Models\LearningOutcome;
use App\RecordStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<LearningOutcome>
 */
class LearningOutcomeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => 'LO-'.fake()->unique()->numerify('###'),
            'description' => fake()->sentence(),
            'subject' => fake()->randomElement(['Science', 'History', 'Geography']),
            'level' => fake()->randomElement(['primary', 'secondary']),
            'status' => RecordStatus::Active,
        ];
    }
}
