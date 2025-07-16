<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'user_id',
        'employee_number',
        'first_name',
        'last_name',
        'middle_name',
        'date_of_birth',
        'gender',
        'national_id',
        'phone_number',
        'emergency_contact_name',
        'emergency_contact_phone',
        'address',
        'department',
        'position',
        'employment_type',
        'hire_date',
        'contract_end_date',
        'basic_salary',
        'hourly_rate',
        'bank_name',
        'bank_account_number',
        'tax_number',
        'nhif_number',
        'nssf_number',
        'annual_leave_days',
        'sick_leave_days',
        'is_active'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'hire_date' => 'date',
        'contract_end_date' => 'date',
        'basic_salary' => 'decimal:2',
        'hourly_rate' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
