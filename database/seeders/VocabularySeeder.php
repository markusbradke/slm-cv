<?php

namespace Database\Seeders;

use App\Models\Vocabulary;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class VocabularySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Antennas',
            'Bedrock Conditions',
            'Bedrock Types',
            'Collocation Types',
            'Countries',
            'Fault Zones',
            'Frequency Standards',
            'Geological Characteristics',
            'Manufacturers',
            'Marker Descriptions',
            'Monument Descriptions',
            'Monument Foundations',
            'Multipath Sources',
            'Radio Interferences',
            'Radomes',
            'Receivers',
            'Sensor Models',
            'Signal Obstructions',
            'Tectonic Plates',
        ];

        foreach ($categories as $category) {
            Vocabulary::create([
                'name' => $category,
                'slug' => Str::slug($category),
            ]);
        }
    }
}
