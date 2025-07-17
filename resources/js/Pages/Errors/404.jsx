import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <>
            <Head title="Page Not Found" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
                <div className="max-w-lg w-full text-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                        <p className="text-gray-600 mb-8">
                            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            Go to Dashboard
                        </Link>
                        
                        <div className="text-sm text-gray-500">
                            Or try these popular pages:
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-2">
                            <Link href="/patients" className="text-blue-600 hover:text-blue-800 text-sm underline">
                                Patients
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/appointments" className="text-blue-600 hover:text-blue-800 text-sm underline">
                                Appointments
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/inventory" className="text-blue-600 hover:text-blue-800 text-sm underline">
                                Inventory
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/invoices" className="text-blue-600 hover:text-blue-800 text-sm underline">
                                Billing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
