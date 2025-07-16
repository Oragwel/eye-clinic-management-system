<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)
            ->latest()
            ->paginate(15);

        return Inertia::render('Inventory/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('Inventory/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_code' => 'required|string|unique:products,product_code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:medication,equipment,supplies,consumables',
            'brand' => 'nullable|string|max:255',
            'unit_of_measure' => 'required|string|max:50',
            'unit_cost' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'minimum_stock' => 'required|integer|min:0',
            'maximum_stock' => 'required|integer|min:1',
            'storage_location' => 'nullable|string|max:255',
            'expiry_date' => 'nullable|date|after:today',
            'requires_prescription' => 'boolean',
        ]);

        $validated['is_active'] = true;

        Product::create($validated);

        return redirect()->route('inventory.index')
            ->with('success', 'Product added successfully.');
    }

    public function show(Product $inventory)
    {
        return Inertia::render('Inventory/Show', [
            'product' => $inventory
        ]);
    }

    public function edit(Product $inventory)
    {
        return Inertia::render('Inventory/Edit', [
            'product' => $inventory
        ]);
    }

    public function update(Request $request, Product $inventory)
    {
        $validated = $request->validate([
            'product_code' => 'required|string|unique:products,product_code,' . $inventory->id,
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:medication,equipment,supplies,consumables',
            'brand' => 'nullable|string|max:255',
            'unit_of_measure' => 'required|string|max:50',
            'unit_cost' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'minimum_stock' => 'required|integer|min:0',
            'maximum_stock' => 'required|integer|min:1',
            'storage_location' => 'nullable|string|max:255',
            'expiry_date' => 'nullable|date',
            'requires_prescription' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $inventory->update($validated);

        return redirect()->route('inventory.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $inventory)
    {
        $inventory->update(['is_active' => false]);

        return redirect()->route('inventory.index')
            ->with('success', 'Product deactivated successfully.');
    }
}
