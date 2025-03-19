<?php

namespace Database\Seeders;

use App\Models\Term;
use App\Models\User;
use App\Models\Vocabulary;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Bouncer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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

        $vocabularies = [
            'antennas',
            'bedrock_conditions',
            'bedrock_types',
            'collocation_types',
            'countries',
            'fault_zones',
            'frequency_standards',
            'geological_characteristics',
            'monument_descriptions',
            'monument_foundations',
            'radomes',
            'receivers',
            'tectonic_plates',
        ];

        foreach ($vocabularies as $vocabulary) {
            $json = json_decode(
                file_get_contents(
                    resource_path('seeding/'.$vocabulary.'.json')),
                associative: true
            );

            foreach ($json as $data) {
                Term::create([
                    'name' => $data['term'],
                    'definition' => $data['definition'] ?? '',
                    'status' => $data['status'] ?? 'accepted',
                    'vocabulary_id' => Vocabulary::where('slug', Str::replace('_', '-', $vocabulary))->first()->id,
                ]);
            }
        }

        // Term::factory(10)->create(['vocabulary_id' => Vocabulary::where('slug', 'antennas')->first()->id]);
        // Term::factory(10)->create(['vocabulary_id' => Vocabulary::where('slug', 'countries')->first()->id]);
        // Term::factory(10)->create(['vocabulary_id' => Vocabulary::where('slug', 'receivers')->first()->id]);

        // Create admin user and role
        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@slm-cv',
        ]);
        $admin = Bouncer::role()->firstOrCreate([
            'name' => 'admin',
            'title' => 'Administrator',
        ]);
        Bouncer::allow('admin')->everything();
        $user->assign($admin);

        // Create a user role
        Bouncer::role()->firstOrCreate([
            'name' => 'user',
            'title' => 'User',
        ]);
    }
}
