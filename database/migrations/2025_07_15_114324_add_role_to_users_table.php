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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'doctor', 'nurse', 'pharmacist', 'receptionist', 'technician'])->default('nurse');
            $table->string('employee_id')->unique()->nullable();
            $table->string('phone_number')->nullable();
            $table->string('specialization')->nullable(); // For doctors
            $table->string('license_number')->nullable(); // Professional license
            $table->boolean('is_active')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
