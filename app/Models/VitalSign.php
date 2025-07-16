<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VitalSign extends Model
{
    protected $fillable = [
        'patient_id',
        'user_id',
        'systolic_bp',
        'diastolic_bp',
        'heart_rate',
        'temperature',
        'respiratory_rate',
        'oxygen_saturation',
        'weight',
        'height',
        'bmi',
        'intraocular_pressure_left',
        'intraocular_pressure_right',
        'notes',
        'recorded_at'
    ];

    protected $casts = [
        'systolic_bp' => 'decimal:2',
        'diastolic_bp' => 'decimal:2',
        'heart_rate' => 'decimal:2',
        'temperature' => 'decimal:1',
        'respiratory_rate' => 'decimal:1',
        'oxygen_saturation' => 'decimal:1',
        'weight' => 'decimal:2',
        'height' => 'decimal:2',
        'bmi' => 'decimal:1',
        'intraocular_pressure_left' => 'decimal:1',
        'intraocular_pressure_right' => 'decimal:1',
        'recorded_at' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
