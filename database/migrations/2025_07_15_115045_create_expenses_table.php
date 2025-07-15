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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('expense_number')->unique();
            $table->foreignId('expense_category_id')->constrained()->onDelete('cascade');
            $table->foreignId('employee_id')->constrained()->onDelete('cascade'); // Who incurred the expense
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('description');
            $table->decimal('amount', 10, 2);
            $table->date('expense_date');
            $table->enum('payment_method', ['cash', 'card', 'bank_transfer', 'cheque', 'petty_cash']);
            $table->string('vendor_name')->nullable();
            $table->string('receipt_number')->nullable();
            $table->string('receipt_file_path')->nullable(); // Scanned receipt
            $table->enum('status', ['pending', 'approved', 'rejected', 'reimbursed'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_reimbursable')->default(true);
            $table->decimal('reimbursed_amount', 10, 2)->default(0);
            $table->date('reimbursed_date')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
