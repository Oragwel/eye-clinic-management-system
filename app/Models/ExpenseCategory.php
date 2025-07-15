<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'type',
        'requires_approval',
        'approval_limit',
        'is_active'
    ];

    protected $casts = [
        'requires_approval' => 'boolean',
        'approval_limit' => 'decimal:2',
        'is_active' => 'boolean',
    ];
}
