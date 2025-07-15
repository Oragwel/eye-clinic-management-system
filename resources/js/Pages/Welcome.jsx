import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Eye Clinic Management System" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-blue-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                {/* Eye Icon */}
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Eye Clinic</h1>
                                    <p className="text-sm text-gray-600">Management System</p>
                                </div>
                            </div>

                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition duration-200"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Comprehensive
                            <span className="text-blue-600 block">Eye Care Management</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Complete healthcare management solution for eye clinics with patient care,
                            inventory tracking, HR management, and financial oversight.
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-200"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Patient Management */}
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient Management</h3>
                            <p className="text-gray-600">Complete patient registration, medical history, and appointment scheduling system.</p>
                        </div>

                        {/* Eye Theatre */}
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Eye Theatre</h3>
                            <p className="text-gray-600">Surgical scheduling, theatre management, and post-operative care tracking.</p>
                        </div>

                        {/* Pharmacy */}
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pharmacy Management</h3>
                            <p className="text-gray-600">Medication inventory, prescription management, and stock tracking.</p>
                        </div>

                        {/* Inventory */}
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Inventory Tracking</h3>
                            <p className="text-gray-600">Real-time inventory management, supplier relations, and purchase orders.</p>
                        </div>

                        {/* HR Management */}
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">HR Management</h3>
                            <p className="text-gray-600">Employee management, attendance tracking, payroll, and leave management.</p>
                        </div>

                        {/* Financial Management */}
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Management</h3>
                            <p className="text-gray-600">Billing, invoicing, expense tracking, and comprehensive financial reporting.</p>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Overview</h2>
                            <p className="text-gray-600">Real-time insights into your eye clinic operations</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                                <div className="text-gray-600">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">1</div>
                                <div className="text-gray-600">Registered Patients</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
                                <div className="text-gray-600">Products in Stock</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">1</div>
                                <div className="text-gray-600">Expense Categories</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="text-center py-8 border-t border-blue-100">
                        <p className="text-gray-600">
                            © 2025 Eye Clinic Management System. Built with Laravel 11, React 18, and Inertia.js.
                        </p>
                    </footer>
                </main>
            </div>
        </>
    );
}
