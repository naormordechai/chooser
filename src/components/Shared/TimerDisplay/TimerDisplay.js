import React, { useEffect, useRef, useState } from 'react';
import styles from './TimerDisplay.module.scss';

export const TimerDisplay = (props) => {
    const [timer, setTimer] = useState(props.duringTimer || 3);

    const interval = useRef(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);
        return () => {
            clearInterval(interval.current);
            console.log('Hello World!');
        }
    }, [])

    useEffect(() => {
        if (timer === 0) {
            clearInterval(interval.current)
            props.onTimerFinish()
        }
    }, [timer])


    return (
        <p className={styles.timerDisplay}>{timer}</p>
    )
}
