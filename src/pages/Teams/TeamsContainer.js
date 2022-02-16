import React, { useEffect, useRef, useState } from 'react';
import styles from './TeamsContainer.module.scss';
import teams from '../../resources/teams.json';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { DisplayInfiniteTeams } from '../../components/Teams/DisplayInfiniteTeams/DisplayInfiniteTeams';
import { TimerDisplay } from '../../components/Shared/TimerDisplay/TimerDisplay';

export const TeamsContainer = () => {
    const [firstIndex, setFirstIndex] = useState(3);
    const [secondIndex, setSecondIndex] = useState(19);
    const [inSearchProcess, setInSearchProcess] = useState(false);
    const [isShowBackdrop, setIsShowBackdrop] = useState(true);

    const interval = useRef();
    const timeout = useRef();

    useEffect(() => {
        return () => {
            clearInterval(interval.current);
            clearTimeout(timeout.current);
        }
    }, [])

    useEffect(() => {
        if (!inSearchProcess && firstIndex === secondIndex) {
            startGame(20, 500);
        }
    }, [inSearchProcess])


    const startInterval = (intervalTime = 20) => {
        interval.current = setInterval(() => {
            setFirstIndex(Math.floor(Math.random() * teams.length))
            setSecondIndex(Math.floor(Math.random() * teams.length))
        }, intervalTime);
    }

    const clearIntervalsAndTimeouts = () => {
        clearInterval(interval.current);
        clearTimeout(timeout.current);
    }

    const startGame = (intervalTime = 20, timeoutTime = 4000) => {
        clearIntervalsAndTimeouts();
        setIsShowBackdrop(false);
        setInSearchProcess(true);
        startInterval(intervalTime);

        timeout.current = setTimeout(() => {
            clearIntervalsAndTimeouts();
            setInSearchProcess(false);
        }, timeoutTime);
    }

    return (
        <div className={styles.container}>
            {isShowBackdrop && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <TimerDisplay onTimerFinish={startGame} />
            </Backdrop>}
            <DisplayInfiniteTeams teams={teams} index={firstIndex} title="(Home)" />
            <DisplayInfiniteTeams teams={teams} index={secondIndex} title="(Away)" />
            {!inSearchProcess && <Button classes={{ root: styles.btn }} onClick={startGame}>PLAY</Button>}
        </div>
    )
}
