<?php

namespace Database\Seeders;

use App\Models\Term;
use App\Models\User;
use App\Models\Vocabulary;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $seeders = [
            VocabularySeeder::class,
        ];
        $this->call($seeders);
        
        Term::factory(10)->create(['vocabulary_id' => Vocabulary::where('slug', 'antennas')->first()->id]);
        Term::factory(10)->create(['vocabulary_id' => Vocabulary::where('slug', 'countries')->first()->id]);
        Term::factory(10)->create(['vocabulary_id' => Vocabulary::where('slug', 'receivers')->first()->id]);
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@slm-cv',
        ]);
    }
}
