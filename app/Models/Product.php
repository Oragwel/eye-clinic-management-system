<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'product_code',
        'name',
        'description',
        'category',
        'brand',
        'model',
        'unit_of_measure',
        'unit_cost',
        'selling_price',
        'current_stock',
        'minimum_stock',
        'maximum_stock',
        'storage_location',
        'barcode',
        'expiry_date',
        'batch_number',
        'supplier_id',
        'requires_prescription',
        'is_controlled_substance',
        'is_active',
        'storage_instructions'
    ];

    protected $casts = [
        'expiry_date' => 'date',
        'unit_cost' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'requires_prescription' => 'boolean',
        'is_controlled_substance' => 'boolean',
        'is_active' => 'boolean',
    ];
}
