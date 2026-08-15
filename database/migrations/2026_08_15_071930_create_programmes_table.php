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
        Schema::create('programmes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedTinyInteger('duration_days')->default(1);
            $table->unsignedTinyInteger('duration_nights')->default(0);
            $table->json('school_levels')->nullable();
            $table->unsignedInteger('min_group_size')->nullable();
            $table->unsignedInteger('max_group_size')->nullable();
            $table->json('themes')->nullable();
            $table->decimal('indicative_price_min', 10, 2)->nullable();
            $table->decimal('indicative_price_max', 10, 2)->nullable();
            $table->string('status')->default('draft')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programmes');
    }
};
