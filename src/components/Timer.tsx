import {useState, useEffect, useContext } from 'react'
import { GameContext } from "../GameContext";
import useTimer from '../useTimer';

const Timer = () => {
    const { gameOver, setTimePlayed } = useContext(GameContext);
    const { time, startOrStop, reset } = useTimer();
    // const [seconds, setSeconds] = useState<number>(0);

    // useEffect(()=>{
    //     let timerId: NodeJS.Timeout;
    //     if (!gameOver){
    //         // setting seconds every 1s
    //         timerId = setTimeout(()=>setSeconds(prev => prev + 1), 1000);
    //     }
    //     return () => clearTimeout(timerId);
    // }, [gameOver, seconds])
    useEffect(() => {
      if (!gameOver) startOrStop();
      if (gameOver) {
        setTimePlayed(time);
        reset();
      }
    }, [gameOver]);

  return (
    <h1 className="timer navbar-text pr-5 hover:cursor-pointer relative" onClick={() => startOrStop()}>
        {Math.floor(time/60).toString().padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}
        <span className='tooltip opacity-0 absolute text-sm whitespace-nowrap -bottom-7 left-0 bg-slate-600/70 text-white p-[3px] rounded-md'>
          Click to pause
        </span>
    </h1>
  )
}

export default Timer