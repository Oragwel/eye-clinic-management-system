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
        Schema::create('surgeries', function (Blueprint $table) {
            $table->id();
            $table->string('surgery_number')->unique();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('surgeon_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('appointment_id')->nullable()->constrained()->onDelete('set null');
            $table->string('procedure_name');
            $table->string('procedure_code')->nullable(); // CPT code
            $table->enum('eye_operated', ['left', 'right', 'both']);
            $table->text('procedure_description');
            $table->enum('urgency', ['elective', 'urgent', 'emergency'])->default('elective');
            $table->datetime('scheduled_at');
            $table->datetime('started_at')->nullable();
            $table->datetime('completed_at')->nullable();
            $table->integer('duration_minutes')->nullable();
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled', 'postponed'])->default('scheduled');
            $table->text('pre_operative_notes')->nullable();
            $table->text('operative_notes')->nullable();
            $table->text('post_operative_notes')->nullable();
            $table->text('complications')->nullable();
            $table->text('follow_up_instructions')->nullable();
            $table->decimal('cost', 10, 2)->default(0);
            $table->string('theatre_room')->nullable();
            $table->json('surgical_team')->nullable(); // Array of staff involved
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surgeries');
    }
};
