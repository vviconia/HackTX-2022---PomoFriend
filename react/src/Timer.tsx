import {
  Box,
  Button,
  ButtonGroup,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useApp } from "./context";
import "./Timer.css";
import { formatTime, MS_IN_MINUTE } from "./utils";

interface TimerProps {
  study: number;
  rest: number;
}

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export const Timer = ({ study, rest }: TimerProps) => {
  const initialStudyTime = study * MS_IN_MINUTE;
  const initialBreakTime = rest * MS_IN_MINUTE;

  const [timeLeft, setTimeLeft] = useState(initialStudyTime);
  const [paused, setPaused] = useState(false);
  const [shouldStudy, setShouldStudy] = useState(true);
  const [currentCycle, setCurrentCycle] = useState(1);
  const { cycles } = useApp();
  const [totalElapsed, setTotalElapsed] = useState(0);

  useEffect(() => {
    if (paused || currentCycle > cycles) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1000));
      setTotalElapsed((prev) => prev + 1000);
      if (timeLeft <= 0) {
        if (shouldStudy) {
          setTimeLeft(initialBreakTime);
        } else {
          setTimeLeft(initialStudyTime);
          setCurrentCycle((prev) => prev + 1);
        }
        setShouldStudy(!shouldStudy);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, paused, initialBreakTime, initialStudyTime, shouldStudy]);

  const percentComplete = () => {
    const total = (initialBreakTime + initialStudyTime) * cycles;
    return 100 * Math.min(1, totalElapsed / total);
  };

  return (
    <>
      {currentCycle > cycles ? (
        <h1>Congratulations, you met your studying goal!</h1>
      ) : (
        <>
          <LinearProgressWithLabel value={percentComplete()} />
          <h1>{formatTime(timeLeft)}</h1>
          <h2>{shouldStudy ? "STUDY" : "TAKE A BREAK :)"}</h2>
          <div className="timer">
            <ButtonGroup>
              <Button
                variant="contained"
                onClick={() => {
                  setTimeLeft(initialStudyTime);
                }}
              >
                Reset Timer
              </Button>
              <Button
                variant="contained"
                onClick={() => setPaused((prev) => !prev)}
              >
                {paused ? "Play" : "Pause"}
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </>
  );
};
