import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ patient }) {
    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Patient Details
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('patients.edit', patient.id)}
                            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-200"
                        >
                            Edit Patient
                        </Link>
                        <Link
                            href={route('patients.index')}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                        >
                            Back to Patients
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`${patient.first_name} ${patient.last_name}`} />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Patient Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-bold text-xl">
                                            {patient.first_name[0]}{patient.last_name[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {patient.first_name} {patient.middle_name} {patient.last_name}
                                        </h3>
                                        <p className="text-gray-600">{patient.patient_number}</p>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                            patient.status === 'active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {patient.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Personal Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Date of Birth:</span>
                                                <span className="font-medium">{new Date(patient.date_of_birth).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Age:</span>
                                                <span className="font-medium">{calculateAge(patient.date_of_birth)} years</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Gender:</span>
                                                <span className="font-medium capitalize">{patient.gender}</span>
                                            </div>
                                            {patient.national_id && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">National ID:</span>
                                                    <span className="font-medium">{patient.national_id}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Contact Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Phone:</span>
                                                <span className="font-medium">{patient.phone_number}</span>
                                            </div>
                                            {patient.email && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Email:</span>
                                                    <span className="font-medium">{patient.email}</span>
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-gray-600">Address:</span>
                                                <p className="font-medium mt-1">{patient.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="text-gray-600">Name:</span>
                                        <p className="font-medium">{patient.emergency_contact_name}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Phone:</span>
                                        <p className="font-medium">{patient.emergency_contact_phone}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Relationship:</span>
                                        <p className="font-medium">{patient.emergency_contact_relationship}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Insurance Information */}
                            {(patient.insurance_provider || patient.insurance_number) && (
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {patient.insurance_provider && (
                                            <div>
                                                <span className="text-gray-600">Provider:</span>
                                                <p className="font-medium">{patient.insurance_provider}</p>
                                            </div>
                                        )}
                                        {patient.insurance_number && (
                                            <div>
                                                <span className="text-gray-600">Policy Number:</span>
                                                <p className="font-medium">{patient.insurance_number}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Medical Information */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                                <div className="space-y-4">
                                    {patient.medical_history && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Medical History</h4>
                                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{patient.medical_history}</p>
                                        </div>
                                    )}
                                    {patient.allergies && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Allergies</h4>
                                            <p className="text-gray-700 bg-red-50 p-3 rounded-lg border border-red-200">{patient.allergies}</p>
                                        </div>
                                    )}
                                    {patient.current_medications && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Current Medications</h4>
                                            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">{patient.current_medications}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link
                                        href={`/appointments/create?patient_id=${patient.id}`}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Book Appointment</span>
                                    </Link>
                                    <Link
                                        href={`/invoices/create?patient_id=${patient.id}`}
                                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span>Create Invoice</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Recent Appointments */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
                                {patient.appointments && patient.appointments.length > 0 ? (
                                    <div className="space-y-3">
                                        {patient.appointments.slice(0, 5).map((appointment, index) => (
                                            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                                                <p className="font-medium text-gray-900">
                                                    {new Date(appointment.scheduled_at).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-gray-600">{appointment.reason_for_visit}</p>
                                                <p className="text-xs text-gray-500">Dr. {appointment.doctor?.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No appointments yet</p>
                                )}
                            </div>

                            {/* Patient Statistics */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Statistics</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Appointments:</span>
                                        <span className="font-medium">{patient.appointments?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Surgeries:</span>
                                        <span className="font-medium">{patient.surgeries?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Invoices:</span>
                                        <span className="font-medium">{patient.invoices?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Patient Since:</span>
                                        <span className="font-medium">{new Date(patient.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
