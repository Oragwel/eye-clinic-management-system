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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('supplier_code')->unique();
            $table->string('name');
            $table->string('contact_person')->nullable();
            $table->string('email')->nullable();
            $table->string('phone_number');
            $table->string('alternative_phone')->nullable();
            $table->text('address');
            $table->string('city');
            $table->string('country')->default('Kenya');
            $table->string('postal_code')->nullable();
            $table->string('tax_number')->nullable(); // VAT/PIN number
            $table->string('license_number')->nullable(); // Pharmacy license
            $table->enum('supplier_type', ['pharmaceutical', 'medical_equipment', 'surgical_instruments', 'office_supplies', 'services', 'other']);
            $table->decimal('credit_limit', 12, 2)->default(0);
            $table->integer('payment_terms_days')->default(30); // Net 30 days
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
