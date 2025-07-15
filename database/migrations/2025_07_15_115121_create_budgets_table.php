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
        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->string('budget_name');
            $table->foreignId('expense_category_id')->constrained()->onDelete('cascade');
            $table->integer('budget_year');
            $table->integer('budget_month')->nullable(); // Null for annual budgets
            $table->decimal('budgeted_amount', 12, 2);
            $table->decimal('spent_amount', 12, 2)->default(0);
            $table->decimal('remaining_amount', 12, 2);
            $table->decimal('variance', 12, 2)->default(0); // Difference between budgeted and spent
            $table->enum('period_type', ['monthly', 'quarterly', 'annual'])->default('monthly');
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
