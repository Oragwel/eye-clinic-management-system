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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_code')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('category', ['medication', 'surgical_instrument', 'medical_equipment', 'consumable', 'office_supply', 'other']);
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->string('unit_of_measure'); // pieces, boxes, bottles, ml, etc.
            $table->decimal('unit_cost', 10, 2)->default(0);
            $table->decimal('selling_price', 10, 2)->default(0);
            $table->integer('current_stock')->default(0);
            $table->integer('minimum_stock')->default(0);
            $table->integer('maximum_stock')->default(1000);
            $table->string('storage_location')->nullable();
            $table->string('barcode')->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('batch_number')->nullable();
            $table->foreignId('supplier_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('requires_prescription')->default(false);
            $table->boolean('is_controlled_substance')->default(false);
            $table->boolean('is_active')->default(true);
            $table->text('storage_instructions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
