<?php

namespace Database\Factories;

use App\Enums\TermStatus;
use App\Models\Vocabulary;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Term>
 */
class TermFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'vocabulary_id' => Vocabulary::factory(),
            'status' => TermStatus::PENDING,
        ];
    }
}
