import { useEffect, useRef, useState } from "react";
import "./StopWatch.css";

export function StopWatch() {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [running, setRunning] = useState(false);

    const startTime = useRef(0);
    const interval = useRef(null);


    function updateTimer() {
        const elapsed = Date.now() - startTime.current;
        setElapsedTime(elapsed);
    }


    function start() {
        if (running) return;

        setRunning(true);

        startTime.current = Date.now() - elapsedTime;

        interval.current = setInterval(updateTimer, 10);
    }


    function stop() {
        setRunning(false);

        clearInterval(interval.current);
        interval.current = null;
    }


    function reset() {
        setRunning(false);

        clearInterval(interval.current);
        interval.current = null;

        setElapsedTime(0);
    }


    useEffect(() => {
        return () => {
            clearInterval(interval.current);
        };
    }, []);


    const minutes = Math.floor(elapsedTime / 60000);

    const seconds = Math.floor(
        (elapsedTime % 60000) / 1000
    );

    const milliseconds = elapsedTime % 1000;


    const display =
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}.` +
        `${String(milliseconds).padStart(3, "0")}`;


    return (
        <div className="stopwatch button">

            <div id="timerDisplay">
                {display}
            </div>

            <button
                className="button"
                id="startBtn"
                onClick={start}
            >
                Start
            </button>

            <button
                className="button"
                id="stopBtn"
                onClick={stop}
            >
                Stop
            </button>

            <button
                className="button"  
                id="resetBtn"
                onClick={reset}
            >
                Reset
            </button>

        </div>
    );
}