import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function ProgressIndicator() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleFinish = () => setIsLoading(false);

        router.on('start', handleStart);
        router.on('finish', handleFinish);

        return () => {
            router.off('start', handleStart);
            router.off('finish', handleFinish);
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="h-1 bg-blue-200">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse"></div>
            </div>
        </div>
    );
}
