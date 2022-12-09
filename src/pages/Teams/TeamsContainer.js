import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import styles from "./TeamsContainer.module.scss";
import Button from "@mui/material/Button";
import { DisplayInfiniteTeams } from "../../components/Teams/DisplayInfiniteTeams/DisplayInfiniteTeams";
import { AppContext } from "../../context/AppContext";

export const TeamsContainer = () => {
  const { state, dispatch } = useContext(AppContext);
  const [inSearchProcess, setInSearchProcess] = useState(false);

  const interval = useRef();
  const timeout = useRef();

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, []);

  useEffect(() => {
    if (!inSearchProcess && state.firstIndex === state.seconedIndex) {
      startGame(20, 500);
    }
  }, [inSearchProcess]);

  const generateRandNumber = (end) => Math.floor(Math.random() * end);

  const startInterval = (intervalTime = 20) => {
    interval.current = setInterval(() => {
      dispatch({
        type: "changeIndexes",
        payload: {
          firstIndex: generateRandNumber(state.teams.length),
          seconedIndex: generateRandNumber(state.teams.length),
        },
      });
    }, intervalTime);
  };

  const clearIntervalsAndTimeouts = () => {
    clearInterval(interval.current);
    clearTimeout(timeout.current);
  };

  const startGame = (intervalTime = 20, timeoutTime = 4000) => {
    clearIntervalsAndTimeouts();
    setInSearchProcess(true);
    startInterval(intervalTime);

    timeout.current = setTimeout(() => {
      clearIntervalsAndTimeouts();
      setInSearchProcess(false);
    }, timeoutTime);
  };

  return (
    <div className={styles.container}>
      {console.log(1)}
      <DisplayInfiniteTeams
        teams={state.teams}
        index={state.firstIndex}
        title="(Home)"
      />
      <DisplayInfiniteTeams
        teams={state.teams}
        index={state.seconedIndex}
        title="(Away)"
      />
      {!inSearchProcess && (
        <Button classes={{ root: styles.btn }} onClick={startGame}>
          PLAY
        </Button>
      )}
    </div>
  );
};
