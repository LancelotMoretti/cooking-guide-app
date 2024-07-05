import { useState, useEffect } from 'react';

interface UseElapsedTimeProps {
    time: Date;
}

export function useElapsedTime({ time }: UseElapsedTimeProps): string {
    const [elapsedTime, setElapsedTime] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now: Date = new Date();
            const diff: number = now.getTime() - time.getTime();

            const year: number = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));
            const month: number = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours: number = Math.floor(diff / (1000 * 60 * 60));
            const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (year > 0) {
                setElapsedTime(`${year} year${year > 1 ? 's' : ''} ago`);
            } else if (month > 0) {
                setElapsedTime(`${month} month${month > 1 ? 's' : ''} ago`);
            } else if (days > 0) {
                setElapsedTime(`${days} day${days > 1 ? 's' : ''} ago`);
            } else if (hours > 0) {
                setElapsedTime(`${hours} hour${hours > 1 ? 's' : ''} ago`);
            } else if (minutes > 0) {
                setElapsedTime(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
            } else {
                setElapsedTime('Just now');
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return elapsedTime;
}