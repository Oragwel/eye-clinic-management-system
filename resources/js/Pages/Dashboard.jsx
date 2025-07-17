import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ stats, recent_activities, charts }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every minute
    useState(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(amount || 0);
    };

    const StatCard = ({ title, value, subtitle, icon, color = 'blue', href = null, trend = null }) => {
        const colorClasses = {
            blue: { bg: 'bg-blue-50', icon: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
            green: { bg: 'bg-green-50', icon: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' },
            purple: { bg: 'bg-purple-50', icon: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
            orange: { bg: 'bg-orange-50', icon: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200' },
            red: { bg: 'bg-red-50', icon: 'bg-red-500', text: 'text-red-600', border: 'border-red-200' },
            yellow: { bg: 'bg-yellow-50', icon: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-200' }
        };

        const colors = colorClasses[color];

        const cardContent = (
            <div className={`relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
                        <div className="mt-2 flex items-baseline">
                            <p className="text-3xl font-bold text-gray-900">{value}</p>
                            {trend && (
                                <span className={`ml-2 text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {trend > 0 ? '+' : ''}{trend}%
                                </span>
                            )}
                        </div>
                        {subtitle && (
                            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                        )}
                    </div>
                    <div className={`${colors.icon} rounded-xl p-3 shadow-lg`}>
                        <div className="h-6 w-6 text-white">
                            {icon}
                        </div>
                    </div>
                </div>
                {href && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
                )}
            </div>
        );

        if (href) {
            return (
                <Link href={href} className="block transform transition-transform hover:scale-105" preserveScroll>
                    {cardContent}
                </Link>
            );
        }

        return cardContent;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Welcome back! Here's what's happening at your clinic today.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">
                            {currentTime.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {currentTime.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Patients"
                            value={stats?.patients?.total || 0}
                            subtitle={`${stats?.patients?.new_this_month || 0} new this month`}
                            color="blue"
                            href="/patients"
                            trend={12}
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            }
                        />

                        <StatCard
                            title="Today's Appointments"
                            value={stats?.appointments?.today || 0}
                            subtitle={`${stats?.appointments?.upcoming || 0} upcoming`}
                            color="green"
                            href="/appointments"
                            trend={8}
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            }
                        />

                        <StatCard
                            title="Monthly Revenue"
                            value={formatCurrency(stats?.financial?.revenue_this_month)}
                            subtitle={`Total: ${formatCurrency(stats?.financial?.total_revenue)}`}
                            color="purple"
                            href="/invoices"
                            trend={15}
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        />

                        <StatCard
                            title="Low Stock Items"
                            value={stats?.inventory?.low_stock || 0}
                            subtitle={`${stats?.inventory?.expiring_soon || 0} expiring soon`}
                            color="orange"
                            href="/inventory"
                            trend={-5}
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Secondary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Surgeries This Month"
                            value={stats?.surgeries?.this_month || 0}
                            subtitle={`${stats?.surgeries?.scheduled || 0} scheduled`}
                            color="red"
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            }
                        />

                        <StatCard
                            title="Active Staff"
                            value={stats?.staff?.total || 0}
                            subtitle={`${stats?.staff?.active_employees || 0} employees`}
                            color="yellow"
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            }
                        />

                        <StatCard
                            title="Pending Invoices"
                            value={formatCurrency(stats?.financial?.pending_invoices)}
                            subtitle="Awaiting payment"
                            color="blue"
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
                                <p className="text-gray-600 mt-1">Frequently used actions for efficient workflow</p>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span>System Online</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link
                                href="/patients/create"
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                                preserveScroll
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold">Add Patient</h4>
                                    <p className="text-blue-100 text-sm mt-1">Register new patient</p>
                                </div>
                            </Link>

                            <Link
                                href="/appointments/create"
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                                preserveScroll
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold">Book Appointment</h4>
                                    <p className="text-green-100 text-sm mt-1">Schedule consultation</p>
                                </div>
                            </Link>

                            <Link
                                href="/surgeries/create"
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                                preserveScroll
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold">Schedule Surgery</h4>
                                    <p className="text-purple-100 text-sm mt-1">Plan eye procedure</p>
                                </div>
                            </Link>

                            <Link
                                href="/invoices/create"
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                                preserveScroll
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent"></div>
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold">Create Invoice</h4>
                                    <p className="text-orange-100 text-sm mt-1">Generate billing</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Today's Schedule */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                                <Link
                                    href="/appointments"
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                                >
                                    <span>View All</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {recent_activities?.todays_schedule?.length > 0 ? (
                                    recent_activities.todays_schedule.slice(0, 5).map((appointment, index) => (
                                        <Link
                                            key={index}
                                            href={`/appointments/${appointment.id}`}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 cursor-pointer"
                                            preserveScroll
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {appointment.patient?.first_name} {appointment.patient?.last_name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">{appointment.reason_for_visit}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {new Date(appointment.scheduled_at).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Dr. {appointment.doctor?.name}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-gray-500">No appointments scheduled for today</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Patients */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
                                <Link
                                    href="/patients"
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                                >
                                    <span>View All</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {recent_activities?.patients?.length > 0 ? (
                                    recent_activities.patients.map((patient, index) => (
                                        <Link
                                            key={index}
                                            href={`/patients/${patient.id}`}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 cursor-pointer"
                                            preserveScroll
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-medium">
                                                        {patient.first_name?.[0]}{patient.last_name?.[0]}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {patient.first_name} {patient.last_name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">{patient.patient_number}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">
                                                    {new Date(patient.created_at).toLocaleDateString()}
                                                </p>
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                    patient.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {patient.status}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <p className="text-gray-500">No recent patients</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Low Stock Alert */}
                    {recent_activities?.low_stock_items?.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    Low Stock Alert
                                </h3>
                                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {recent_activities.low_stock_items.length} items
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {recent_activities.low_stock_items.map((item, index) => (
                                    <div key={index} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-600">{item.product_code}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-orange-600">
                                                    {item.current_stock} {item.unit_of_measure}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Min: {item.minimum_stock}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Revenue Chart */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Trend</h3>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div className="space-y-4">
                            {charts?.monthly_revenue?.length > 0 ? (
                                charts.monthly_revenue.map((month, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-900">{month.month}</span>
                                        <span className="text-lg font-bold text-blue-600">
                                            {formatCurrency(month.revenue)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p className="text-gray-500">No revenue data available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
