import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './TeamsContainer.module.scss';
import teamsJson from '../../resources/teams.json';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { DisplayInfiniteTeams } from '../../components/Teams/DisplayInfiniteTeams/DisplayInfiniteTeams';
import { TimerDisplay } from '../../components/Shared/TimerDisplay/TimerDisplay';
import { AppContext } from '../../context/AppContext';

export const TeamsContainer = () => {
    const { state, dispatch } = useContext(AppContext);
    console.log(state);
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
        if (!inSearchProcess && state.firstIndex === state.secondIndex) {
            startGame(20, 500);
        }
    }, [inSearchProcess])


    const startInterval = (intervalTime = 20) => {
        interval.current = setInterval(() => {
            dispatch({ type: 'changeIndexes', payload: { firstIndex: Math.floor(Math.random() * state.teams.length), seconedIndex: Math.floor(Math.random() * state.teams.length) } })
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
            {/* {isShowBackdrop && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <TimerDisplay onTimerFinish={startGame} />
            </Backdrop>} */}
            <DisplayInfiniteTeams teams={state.teams} index={state.firstIndex} title="(Home)" />
            <DisplayInfiniteTeams teams={state.teams} index={state.seconedIndex} title="(Away)" />
            {!inSearchProcess && <Button classes={{ root: styles.btn }} onClick={startGame}>PLAY</Button>}
        </div>
    )
}
