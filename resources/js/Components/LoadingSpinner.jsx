export default function LoadingSpinner({ size = 'md', color = 'blue' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const colorClasses = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
        gray: 'text-gray-600'
    };

    return (
        <div className="flex items-center justify-center">
            <svg 
                className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} 
                fill="none" 
                viewBox="0 0 24 24"
            >
                <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                />
                <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );
}

export function LoadingPage({ message = 'Loading...' }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="xl" />
                <p className="mt-4 text-gray-600 font-medium">{message}</p>
            </div>
        </div>
    );
}

export function LoadingButton({ loading, children, ...props }) {
    return (
        <button 
            {...props} 
            disabled={loading || props.disabled}
            className={`${props.className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
            {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" color="gray" />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
