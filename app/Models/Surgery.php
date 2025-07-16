<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Surgery extends Model
{
    protected $fillable = [
        'surgery_number',
        'patient_id',
        'surgeon_id',
        'appointment_id',
        'procedure_name',
        'procedure_code',
        'eye_operated',
        'procedure_description',
        'urgency',
        'scheduled_at',
        'started_at',
        'completed_at',
        'duration_minutes',
        'status',
        'pre_operative_notes',
        'operative_notes',
        'post_operative_notes',
        'complications',
        'follow_up_instructions',
        'cost',
        'theatre_room',
        'surgical_team'
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'cost' => 'decimal:2',
        'surgical_team' => 'array',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function surgeon()
    {
        return $this->belongsTo(User::class, 'surgeon_id');
    }

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
