<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'appointment_number',
        'patient_id',
        'doctor_id',
        'type',
        'scheduled_at',
        'duration_minutes',
        'status',
        'reason_for_visit',
        'notes',
        'cancellation_reason',
        'checked_in_at',
        'checked_out_at'
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'checked_in_at' => 'datetime',
        'checked_out_at' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
