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
        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_number')->unique();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Who performed the transaction
            $table->enum('transaction_type', ['purchase', 'sale', 'adjustment', 'transfer', 'return', 'expired', 'damaged']);
            $table->integer('quantity_before');
            $table->integer('quantity_changed'); // Positive for in, negative for out
            $table->integer('quantity_after');
            $table->decimal('unit_cost', 10, 2)->nullable();
            $table->decimal('total_cost', 10, 2)->nullable();
            $table->string('reference_number')->nullable(); // PO number, invoice number, etc.
            $table->foreignId('patient_id')->nullable()->constrained()->onDelete('set null'); // For sales to patients
            $table->foreignId('supplier_id')->nullable()->constrained()->onDelete('set null'); // For purchases
            $table->text('notes')->nullable();
            $table->string('batch_number')->nullable();
            $table->date('expiry_date')->nullable();
            $table->timestamp('transaction_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_transactions');
    }
};
