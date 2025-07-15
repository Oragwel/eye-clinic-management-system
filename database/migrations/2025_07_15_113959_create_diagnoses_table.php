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
        Schema::create('diagnoses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade');
            $table->string('icd_code')->nullable(); // ICD-10 code
            $table->string('diagnosis_name');
            $table->text('description');
            $table->enum('eye_affected', ['left', 'right', 'both', 'none'])->default('none');
            $table->enum('severity', ['mild', 'moderate', 'severe', 'critical'])->default('mild');
            $table->enum('status', ['active', 'resolved', 'chronic', 'under_treatment'])->default('active');
            $table->text('symptoms')->nullable();
            $table->text('examination_findings')->nullable();
            $table->text('treatment_plan')->nullable();
            $table->text('prognosis')->nullable();
            $table->date('diagnosed_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnoses');
    }
};
