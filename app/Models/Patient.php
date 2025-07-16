<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'patient_number',
        'first_name',
        'last_name',
        'middle_name',
        'date_of_birth',
        'gender',
        'phone_number',
        'email',
        'address',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relationship',
        'national_id',
        'insurance_provider',
        'insurance_number',
        'medical_history',
        'allergies',
        'current_medications',
        'status'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    // Relationships
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function vitalSigns()
    {
        return $this->hasMany(VitalSign::class);
    }

    public function diagnoses()
    {
        return $this->hasMany(Diagnosis::class);
    }

    public function surgeries()
    {
        return $this->hasMany(Surgery::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
