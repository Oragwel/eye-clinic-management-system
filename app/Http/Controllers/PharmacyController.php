<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class PharmacyController extends Controller
{
    public function index()
    {
        $medications = Product::where('category', 'medication')
            ->where('is_active', true)
            ->orderBy('name')
            ->paginate(20);

        return Inertia::render('Pharmacy/Index', [
            'medications' => $medications
        ]);
    }
}
