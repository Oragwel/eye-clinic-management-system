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
        Schema::create('leaves', function (Blueprint $table) {
            $table->id();
            $table->string('leave_number')->unique();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->enum('leave_type', ['annual', 'sick', 'maternity', 'paternity', 'compassionate', 'study', 'unpaid', 'other']);
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('days_requested');
            $table->integer('days_approved')->nullable();
            $table->text('reason');
            $table->text('medical_certificate_path')->nullable(); // For sick leave
            $table->enum('status', ['pending', 'approved', 'rejected', 'cancelled'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->text('notes')->nullable();
            $table->date('applied_date');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('covering_employee_id')->nullable()->constrained('employees')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaves');
    }
};
