<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\Surgery;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with(['patient', 'appointment', 'surgery', 'creator'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function create()
    {
        $patients = Patient::where('status', 'active')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'patient_number']);

        $appointments = Appointment::with(['patient'])
            ->where('status', 'completed')
            ->whereDoesntHave('invoices')
            ->orderBy('scheduled_at', 'desc')
            ->get();

        $surgeries = Surgery::with(['patient'])
            ->where('status', 'completed')
            ->whereDoesntHave('invoices')
            ->orderBy('scheduled_at', 'desc')
            ->get();

        $products = Product::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'product_code', 'selling_price', 'unit_of_measure']);

        return Inertia::render('Invoices/Create', [
            'patients' => $patients,
            'appointments' => $appointments,
            'surgeries' => $surgeries,
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'surgery_id' => 'nullable|exists:surgeries,id',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:invoice_date',
            'line_items' => 'required|array|min:1',
            'line_items.*.description' => 'required|string',
            'line_items.*.quantity' => 'required|numeric|min:1',
            'line_items.*.unit_price' => 'required|numeric|min:0',
            'line_items.*.total' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'discount_amount' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        // Generate invoice number
        $lastInvoice = Invoice::latest()->first();
        $nextNumber = $lastInvoice ? (int)substr($lastInvoice->invoice_number, 3) + 1 : 1;
        $validated['invoice_number'] = 'INV' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
        $validated['created_by'] = auth()->id();
        $validated['status'] = 'draft';
        $validated['balance_due'] = $validated['total_amount'];

        Invoice::create($validated);

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice created successfully.');
    }

    public function show(Invoice $invoice)
    {
        $invoice->load(['patient', 'appointment', 'surgery', 'creator']);

        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice
        ]);
    }

    public function edit(Invoice $invoice)
    {
        $patients = Patient::where('status', 'active')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'patient_number']);

        $products = Product::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'product_code', 'selling_price', 'unit_of_measure']);

        return Inertia::render('Invoices/Edit', [
            'invoice' => $invoice,
            'patients' => $patients,
            'products' => $products
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:invoice_date',
            'line_items' => 'required|array|min:1',
            'subtotal' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'discount_amount' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'paid_amount' => 'required|numeric|min:0',
            'status' => 'required|in:draft,sent,paid,overdue,cancelled',
            'payment_method' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $validated['balance_due'] = $validated['total_amount'] - $validated['paid_amount'];

        if ($validated['paid_amount'] >= $validated['total_amount'] && $invoice->status !== 'paid') {
            $validated['paid_at'] = now();
            $validated['status'] = 'paid';
        }

        $invoice->update($validated);

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice updated successfully.');
    }

    public function destroy(Invoice $invoice)
    {
        if ($invoice->status === 'paid') {
            return redirect()->route('invoices.index')
                ->with('error', 'Cannot delete a paid invoice.');
        }

        $invoice->delete();

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice deleted successfully.');
    }
}
