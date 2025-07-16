<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor'])
            ->latest('scheduled_at')
            ->paginate(15);

        return Inertia::render('Appointments/Index', [
            'appointments' => $appointments
        ]);
    }

    public function create()
    {
        $patients = Patient::where('status', 'active')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'patient_number']);

        $doctors = User::where('role', 'doctor')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Appointments/Create', [
            'patients' => $patients,
            'doctors' => $doctors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:users,id',
            'type' => 'required|in:consultation,follow_up,emergency,surgery_consultation',
            'scheduled_at' => 'required|date|after:now',
            'duration_minutes' => 'required|integer|min:15|max:240',
            'reason_for_visit' => 'required|string|max:500',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Generate appointment number
        $lastAppointment = Appointment::latest()->first();
        $nextNumber = $lastAppointment ? (int)substr($lastAppointment->appointment_number, 3) + 1 : 1;
        $validated['appointment_number'] = 'APT' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
        $validated['status'] = 'scheduled';

        Appointment::create($validated);

        return redirect()->route('appointments.index')
            ->with('success', 'Appointment scheduled successfully.');
    }

    public function show(Appointment $appointment)
    {
        $appointment->load(['patient', 'doctor', 'diagnoses', 'vitalSigns']);

        return Inertia::render('Appointments/Show', [
            'appointment' => $appointment
        ]);
    }

    public function edit(Appointment $appointment)
    {
        $patients = Patient::where('status', 'active')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'patient_number']);

        $doctors = User::where('role', 'doctor')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Appointments/Edit', [
            'appointment' => $appointment,
            'patients' => $patients,
            'doctors' => $doctors
        ]);
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:users,id',
            'type' => 'required|in:consultation,follow_up,emergency,surgery_consultation',
            'scheduled_at' => 'required|date',
            'duration_minutes' => 'required|integer|min:15|max:240',
            'reason_for_visit' => 'required|string|max:500',
            'notes' => 'nullable|string|max:1000',
            'status' => 'required|in:scheduled,confirmed,in_progress,completed,cancelled,no_show',
        ]);

        $appointment->update($validated);

        return redirect()->route('appointments.index')
            ->with('success', 'Appointment updated successfully.');
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return redirect()->route('appointments.index')
            ->with('success', 'Appointment deleted successfully.');
    }
}
