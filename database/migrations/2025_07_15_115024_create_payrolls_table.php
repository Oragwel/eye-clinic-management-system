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
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->string('payroll_number')->unique();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->integer('pay_period_month');
            $table->integer('pay_period_year');
            $table->decimal('basic_salary', 10, 2);
            $table->decimal('overtime_pay', 10, 2)->default(0);
            $table->decimal('allowances', 10, 2)->default(0); // Transport, medical, etc.
            $table->decimal('bonuses', 10, 2)->default(0);
            $table->decimal('gross_pay', 10, 2);
            $table->decimal('paye_tax', 10, 2)->default(0); // Income tax
            $table->decimal('nhif_deduction', 10, 2)->default(0);
            $table->decimal('nssf_deduction', 10, 2)->default(0);
            $table->decimal('other_deductions', 10, 2)->default(0); // Loans, advances, etc.
            $table->decimal('total_deductions', 10, 2)->default(0);
            $table->decimal('net_pay', 10, 2);
            $table->integer('days_worked');
            $table->integer('overtime_hours')->default(0);
            $table->date('pay_date');
            $table->enum('status', ['draft', 'approved', 'paid'])->default('draft');
            $table->text('notes')->nullable();
            $table->foreignId('processed_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
