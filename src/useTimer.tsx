import { useState, useEffect } from 'react';

const useTimer = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() =>{
        let intervalId: NodeJS.Timeout;
        if (isRunning) {
            intervalId = setInterval(() => setTime(time+1), 1000);
        }
            return () => clearInterval(intervalId);
    }, [isRunning, time]);

    const startOrStop = () => {
        setIsRunning(prev => !prev);
    }
    const reset = () => {
        setTime(0);
        setIsRunning(false);
    }
    return { time, isRunning, startOrStop, reset}
}

export default useTimer;