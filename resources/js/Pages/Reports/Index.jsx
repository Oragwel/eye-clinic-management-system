import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ 
    patientStats, 
    appointmentStats, 
    surgeryStats, 
    financialStats, 
    inventoryStats, 
    staffStats 
}) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(amount || 0);
    };

    const StatCard = ({ title, value, subtitle, color = 'blue', icon }) => {
        const colorClasses = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            purple: 'from-purple-500 to-purple-600',
            orange: 'from-orange-500 to-orange-600',
            red: 'from-red-500 to-red-600',
            indigo: 'from-indigo-500 to-indigo-600'
        };

        return (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${colorClasses[color]} p-4`}>
                    <div className="flex items-center justify-between text-white">
                        <div>
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="text-2xl font-bold mt-1">{value}</p>
                            {subtitle && <p className="text-sm opacity-90 mt-1">{subtitle}</p>}
                        </div>
                        <div className="text-white/80">
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const ChartCard = ({ title, children }) => (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            {children}
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Comprehensive insights into your clinic's performance
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                            Export Report
                        </button>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
                            Print
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Reports" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Patients"
                            value={patientStats?.total || 0}
                            subtitle={`${patientStats?.new_this_month || 0} new this month`}
                            color="blue"
                            icon={
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            }
                        />
                        
                        <StatCard
                            title="Total Appointments"
                            value={appointmentStats?.total || 0}
                            subtitle={`${appointmentStats?.this_week || 0} this week`}
                            color="green"
                            icon={
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            }
                        />
                        
                        <StatCard
                            title="Total Revenue"
                            value={formatCurrency(financialStats?.total_revenue)}
                            subtitle={`${formatCurrency(financialStats?.revenue_this_month)} this month`}
                            color="purple"
                            icon={
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        />
                        
                        <StatCard
                            title="Total Surgeries"
                            value={surgeryStats?.total || 0}
                            subtitle={`${surgeryStats?.this_month || 0} this month`}
                            color="orange"
                            icon={
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Charts and Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Patient Demographics */}
                        <ChartCard title="Patient Demographics">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">By Gender</h4>
                                    <div className="space-y-2">
                                        {patientStats?.by_gender?.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="capitalize text-gray-600">{item.gender}</span>
                                                <span className="font-semibold">{item.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">By Age Group</h4>
                                    <div className="space-y-2">
                                        {patientStats?.by_age_group?.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="text-gray-600">{item.age_group} years</span>
                                                <span className="font-semibold">{item.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ChartCard>

                        {/* Appointment Analytics */}
                        <ChartCard title="Appointment Analytics">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">By Type</h4>
                                    <div className="space-y-2">
                                        {appointmentStats?.by_type?.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="capitalize text-gray-600">{item.type.replace('_', ' ')}</span>
                                                <span className="font-semibold">{item.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">By Status</h4>
                                    <div className="space-y-2">
                                        {appointmentStats?.by_status?.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="capitalize text-gray-600">{item.status}</span>
                                                <span className="font-semibold">{item.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ChartCard>
                    </div>

                    {/* Financial and Inventory */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Financial Summary */}
                        <ChartCard title="Financial Summary">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-green-700 font-medium">Total Revenue</span>
                                    <span className="text-green-800 font-bold">{formatCurrency(financialStats?.total_revenue)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="text-blue-700 font-medium">This Month</span>
                                    <span className="text-blue-800 font-bold">{formatCurrency(financialStats?.revenue_this_month)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                    <span className="text-yellow-700 font-medium">Pending</span>
                                    <span className="text-yellow-800 font-bold">{formatCurrency(financialStats?.pending_amount)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                    <span className="text-red-700 font-medium">Overdue</span>
                                    <span className="text-red-800 font-bold">{formatCurrency(financialStats?.overdue_amount)}</span>
                                </div>
                            </div>
                        </ChartCard>

                        {/* Inventory Status */}
                        <ChartCard title="Inventory Status">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{inventoryStats?.total_products || 0}</div>
                                        <div className="text-sm text-blue-700">Total Products</div>
                                    </div>
                                    <div className="text-center p-4 bg-red-50 rounded-lg">
                                        <div className="text-2xl font-bold text-red-600">{inventoryStats?.low_stock || 0}</div>
                                        <div className="text-sm text-red-700">Low Stock</div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">By Category</h4>
                                    <div className="space-y-2">
                                        {inventoryStats?.by_category?.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="capitalize text-gray-600">{item.category}</span>
                                                <span className="font-semibold">{item.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ChartCard>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
