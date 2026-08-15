<?php

namespace Database\Factories;

use App\LeadStatus;
use App\Models\Lead;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reference' => 'LLT-'.now()->year.'-'.fake()->unique()->numerify('#####'),
            'school_id' => School::factory(),
            'assigned_to' => User::factory(),
            'source' => fake()->randomElement(['website', 'referral', 'admin']),
            'status' => LeadStatus::New,
            'school_level' => fake()->randomElement(['primary', 'secondary', 'mixed']),
            'student_count' => fake()->numberBetween(20, 150),
            'duration_days' => fake()->numberBetween(1, 3),
            'duration_nights' => fake()->numberBetween(0, 2),
            'learning_interests' => fake()->randomElements(['science', 'history', 'geography', 'culture'], 2),
            'experience_preferences' => fake()->randomElements(['hands_on', 'outdoor', 'teamwork'], 2),
            'budget_min' => 150,
            'budget_max' => 300,
            'learning_objective' => fake()->sentence(),
            'next_follow_up_at' => fake()->optional()->dateTimeBetween('now', '+1 week'),
        ];
    }
}
