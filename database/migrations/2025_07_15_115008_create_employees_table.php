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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('employee_number')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('national_id')->unique();
            $table->string('phone_number');
            $table->string('emergency_contact_name');
            $table->string('emergency_contact_phone');
            $table->text('address');
            $table->string('department');
            $table->string('position');
            $table->enum('employment_type', ['full_time', 'part_time', 'contract', 'intern']);
            $table->date('hire_date');
            $table->date('contract_end_date')->nullable();
            $table->decimal('basic_salary', 10, 2);
            $table->decimal('hourly_rate', 8, 2)->nullable();
            $table->string('bank_name')->nullable();
            $table->string('bank_account_number')->nullable();
            $table->string('tax_number')->nullable(); // KRA PIN
            $table->string('nhif_number')->nullable();
            $table->string('nssf_number')->nullable();
            $table->integer('annual_leave_days')->default(21);
            $table->integer('sick_leave_days')->default(14);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
