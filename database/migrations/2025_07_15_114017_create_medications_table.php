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
        Schema::create('medications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('generic_name')->nullable();
            $table->string('brand_name')->nullable();
            $table->enum('category', ['eye_drops', 'oral_medication', 'injection', 'ointment', 'gel', 'other']);
            $table->text('description')->nullable();
            $table->string('strength')->nullable(); // e.g., "0.5%", "10mg"
            $table->string('dosage_form')->nullable(); // e.g., "drops", "tablets", "ml"
            $table->text('indications')->nullable(); // What it's used for
            $table->text('contraindications')->nullable(); // When not to use
            $table->text('side_effects')->nullable();
            $table->text('storage_instructions')->nullable();
            $table->decimal('unit_price', 10, 2)->default(0);
            $table->integer('stock_quantity')->default(0);
            $table->integer('reorder_level')->default(10);
            $table->boolean('requires_prescription')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medications');
    }
};
