import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ patients, doctors }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: '',
        doctor_id: '',
        type: '',
        scheduled_at: '',
        duration_minutes: 30,
        reason_for_visit: '',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('appointments.store'));
    };

    // Generate time slots for appointment scheduling
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 8; hour < 18; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(time);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Book New Appointment
                    </h2>
                    <Link
                        href={route('appointments.index')}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                    >
                        Back to Appointments
                    </Link>
                </div>
            }
        >
            <Head title="Book Appointment" />

            <div className="py-6">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Patient and Doctor Selection */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Patient *</label>
                                        <select
                                            value={data.patient_id}
                                            onChange={(e) => setData('patient_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Patient</option>
                                            {patients.map((patient) => (
                                                <option key={patient.id} value={patient.id}>
                                                    {patient.first_name} {patient.last_name} ({patient.patient_number})
                                                </option>
                                            ))}
                                        </select>
                                        {errors.patient_id && <p className="mt-1 text-sm text-red-600">{errors.patient_id}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Doctor *</label>
                                        <select
                                            value={data.doctor_id}
                                            onChange={(e) => setData('doctor_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Doctor</option>
                                            {doctors.map((doctor) => (
                                                <option key={doctor.id} value={doctor.id}>
                                                    {doctor.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.doctor_id && <p className="mt-1 text-sm text-red-600">{errors.doctor_id}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Type and Duration */}
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Appointment Type *</label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Type</option>
                                            <option value="consultation">Consultation</option>
                                            <option value="follow_up">Follow-up</option>
                                            <option value="emergency">Emergency</option>
                                            <option value="surgery_consultation">Surgery Consultation</option>
                                        </select>
                                        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Duration (minutes) *</label>
                                        <select
                                            value={data.duration_minutes}
                                            onChange={(e) => setData('duration_minutes', parseInt(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        >
                                            <option value={15}>15 minutes</option>
                                            <option value={30}>30 minutes</option>
                                            <option value={45}>45 minutes</option>
                                            <option value={60}>1 hour</option>
                                            <option value={90}>1.5 hours</option>
                                            <option value={120}>2 hours</option>
                                        </select>
                                        {errors.duration_minutes && <p className="mt-1 text-sm text-red-600">{errors.duration_minutes}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Date and Time */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Date *</label>
                                        <input
                                            type="date"
                                            value={data.scheduled_at ? data.scheduled_at.split('T')[0] : ''}
                                            onChange={(e) => {
                                                const time = data.scheduled_at ? data.scheduled_at.split('T')[1] : '09:00';
                                                setData('scheduled_at', `${e.target.value}T${time}`);
                                            }}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.scheduled_at && <p className="mt-1 text-sm text-red-600">{errors.scheduled_at}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Time *</label>
                                        <select
                                            value={data.scheduled_at ? data.scheduled_at.split('T')[1] : ''}
                                            onChange={(e) => {
                                                const date = data.scheduled_at ? data.scheduled_at.split('T')[0] : new Date().toISOString().split('T')[0];
                                                setData('scheduled_at', `${date}T${e.target.value}`);
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Time</option>
                                            {timeSlots.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Reason for Visit */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Reason for Visit *</label>
                                <textarea
                                    value={data.reason_for_visit}
                                    onChange={(e) => setData('reason_for_visit', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Describe the reason for this appointment..."
                                    required
                                />
                                {errors.reason_for_visit && <p className="mt-1 text-sm text-red-600">{errors.reason_for_visit}</p>}
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Any additional notes or special requirements..."
                                />
                                {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                <Link
                                    href={route('appointments.index')}
                                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                                >
                                    {processing ? 'Booking...' : 'Book Appointment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
