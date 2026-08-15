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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category')->nullable()->index();
            $table->json('learning_themes')->nullable();
            $table->json('school_levels')->nullable();
            $table->unsignedTinyInteger('min_age')->nullable();
            $table->unsignedTinyInteger('max_age')->nullable();
            $table->unsignedInteger('duration_minutes');
            $table->unsignedInteger('maximum_capacity');
            $table->unsignedInteger('minimum_capacity')->nullable();
            $table->string('environment')->nullable()->index();
            $table->string('suggested_time')->nullable();
            $table->json('operating_hours')->nullable();
            $table->boolean('weather_sensitive')->default(false)->index();
            $table->decimal('base_cost', 12, 2)->nullable();
            $table->string('status')->default('draft')->index();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
