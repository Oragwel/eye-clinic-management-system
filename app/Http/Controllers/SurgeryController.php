<?php

namespace App\Http\Controllers;

use App\Models\Surgery;
use App\Models\Patient;
use App\Models\User;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurgeryController extends Controller
{
    public function index()
    {
        $surgeries = Surgery::with(['patient', 'surgeon', 'appointment'])
            ->latest('scheduled_at')
            ->paginate(15);

        return Inertia::render('Surgeries/Index', [
            'surgeries' => $surgeries
        ]);
    }

    public function create()
    {
        $patients = Patient::where('status', 'active')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'patient_number']);

        $surgeons = User::where('role', 'doctor')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $appointments = Appointment::with(['patient'])
            ->where('status', 'scheduled')
            ->where('type', 'surgery_consultation')
            ->orderBy('scheduled_at')
            ->get();

        return Inertia::render('Surgeries/Create', [
            'patients' => $patients,
            'surgeons' => $surgeons,
            'appointments' => $appointments
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'surgeon_id' => 'required|exists:users,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'procedure_name' => 'required|string|max:255',
            'procedure_code' => 'nullable|string|max:50',
            'eye_operated' => 'required|in:left,right,both',
            'procedure_description' => 'required|string',
            'urgency' => 'required|in:routine,urgent,emergency',
            'scheduled_at' => 'required|date|after:now',
            'duration_minutes' => 'required|integer|min:30|max:480',
            'theatre_room' => 'required|string|max:50',
            'pre_operative_notes' => 'nullable|string',
            'cost' => 'required|numeric|min:0',
        ]);

        // Generate surgery number
        $lastSurgery = Surgery::latest()->first();
        $nextNumber = $lastSurgery ? (int)substr($lastSurgery->surgery_number, 3) + 1 : 1;
        $validated['surgery_number'] = 'SUR' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
        $validated['status'] = 'scheduled';

        Surgery::create($validated);

        return redirect()->route('surgeries.index')
            ->with('success', 'Surgery scheduled successfully.');
    }

    public function show(Surgery $surgery)
    {
        $surgery->load(['patient', 'surgeon', 'appointment']);

        return Inertia::render('Surgeries/Show', [
            'surgery' => $surgery
        ]);
    }

    public function edit(Surgery $surgery)
    {
        $patients = Patient::where('status', 'active')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'patient_number']);

        $surgeons = User::where('role', 'doctor')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Surgeries/Edit', [
            'surgery' => $surgery,
            'patients' => $patients,
            'surgeons' => $surgeons
        ]);
    }

    public function update(Request $request, Surgery $surgery)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'surgeon_id' => 'required|exists:users,id',
            'procedure_name' => 'required|string|max:255',
            'procedure_code' => 'nullable|string|max:50',
            'eye_operated' => 'required|in:left,right,both',
            'procedure_description' => 'required|string',
            'urgency' => 'required|in:routine,urgent,emergency',
            'scheduled_at' => 'required|date',
            'duration_minutes' => 'required|integer|min:30|max:480',
            'theatre_room' => 'required|string|max:50',
            'status' => 'required|in:scheduled,in_progress,completed,cancelled,postponed',
            'pre_operative_notes' => 'nullable|string',
            'operative_notes' => 'nullable|string',
            'post_operative_notes' => 'nullable|string',
            'complications' => 'nullable|string',
            'follow_up_instructions' => 'nullable|string',
            'cost' => 'required|numeric|min:0',
        ]);

        $surgery->update($validated);

        return redirect()->route('surgeries.index')
            ->with('success', 'Surgery updated successfully.');
    }

    public function destroy(Surgery $surgery)
    {
        $surgery->delete();

        return redirect()->route('surgeries.index')
            ->with('success', 'Surgery deleted successfully.');
    }
}
