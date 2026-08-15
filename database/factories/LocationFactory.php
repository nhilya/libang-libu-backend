<?php

namespace Database\Factories;

use App\Models\Location;
use App\RecordStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->company(),
            'type' => fake()->randomElement(['attraction', 'museum', 'outdoor']),
            'address' => fake()->address(),
            'contact' => fake()->phoneNumber(),
            'bus_notes' => fake()->sentence(),
            'capacity' => fake()->numberBetween(30, 200),
            'status' => RecordStatus::Active,
        ];
    }
}
