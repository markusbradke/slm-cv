<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('terms', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('vocabulary_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('definition')->nullable();
            $table->text('provenance')->nullable();
            $table->text('provenance_uri')->nullable();
            $table->text('discussion_url')->nullable();
            $table->text('notes')->nullable();
            $table->jsonb('aliases')->nullable();
            $table->enum('status', ['accepted', 'pending', 'rejected', 'deprecated'])->default('pending');
            $table->timestamps();

            $table->unique(['name', 'vocabulary_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('terms');
    }
};
