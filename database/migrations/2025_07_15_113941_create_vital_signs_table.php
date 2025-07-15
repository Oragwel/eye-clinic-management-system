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
        Schema::create('vital_signs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Nurse who recorded
            $table->decimal('systolic_bp', 5, 2)->nullable(); // Blood pressure systolic
            $table->decimal('diastolic_bp', 5, 2)->nullable(); // Blood pressure diastolic
            $table->decimal('heart_rate', 5, 2)->nullable(); // Beats per minute
            $table->decimal('temperature', 4, 1)->nullable(); // Celsius
            $table->decimal('respiratory_rate', 4, 1)->nullable(); // Breaths per minute
            $table->decimal('oxygen_saturation', 4, 1)->nullable(); // Percentage
            $table->decimal('weight', 5, 2)->nullable(); // Kilograms
            $table->decimal('height', 5, 2)->nullable(); // Centimeters
            $table->decimal('bmi', 4, 1)->nullable(); // Body Mass Index
            $table->decimal('intraocular_pressure_left', 4, 1)->nullable(); // mmHg
            $table->decimal('intraocular_pressure_right', 4, 1)->nullable(); // mmHg
            $table->text('notes')->nullable();
            $table->timestamp('recorded_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vital_signs');
    }
};
