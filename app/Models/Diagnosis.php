<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    protected $fillable = [
        'patient_id',
        'appointment_id',
        'doctor_id',
        'icd_code',
        'diagnosis_name',
        'description',
        'eye_affected',
        'severity',
        'status',
        'symptoms',
        'examination_findings',
        'treatment_plan',
        'prognosis',
        'diagnosed_at'
    ];

    protected $casts = [
        'diagnosed_at' => 'date',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
