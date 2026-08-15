<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'school_id' => School::factory(),
            'name' => fake()->name(),
            'role' => fake()->randomElement(['Trip Coordinator', 'Teacher', 'Finance']),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'notes' => fake()->optional()->sentence(),
            'is_primary' => false,
        ];
    }
}
