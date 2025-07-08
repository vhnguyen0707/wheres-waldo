import games from '../gameInfo';
import { useEffect, useState } from 'react';
import Score from '../types/Score';
import { handleGetScores } from '../handleFirebase';

const LeaderBoard = () => {
    const [game, setGame] = useState(0);
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(()=>{
        const getScoresFB = () => {
            handleGetScores(games[game].id).then(scores=>setScores(scores));
        }
        getScoresFB();
    }, [game])
  return (
    <div className="flex flex-col items-center mt-10 gap-5">
        <h1 className='text-3xl font-["Josefin_sans"]'>Leaderboard</h1>
        <div className='game-display relative bg-sky-200 p-4 rounded-lg'>
            <img src={games[game].url} alt={games[game].title} className='rounded-md w-[400px] aspect-[4/3] object-cover'/>
            <p className='text-center text-lg font-semibold mt-4 font-["Josefin_sans"]'>{games[game].title}</p>
            <div 
                onClick={()=>{
                    game > 0 && setGame(game-1)
                }}
                className={`
                    cursor-pointer
                    absolute top-1/2 translate-y-[-50%] -left-10
                    w-[45px] h-[45px] border-r-[6px] border-b-[6px]
                    border-sky-700/70 rotate-[135deg] ${game===0 ? 'opacity-30' : ''}`}
                ></div>
            <div 
                onClick={()=>{
                    game < games.length-1 && setGame(game+1)
                }}
                className={`
                        cursor-pointer
                        absolute top-1/2 translate-y-[-50%] -right-10
                        w-[45px] h-[45px] border-r-[6px] border-b-[6px]
                        border-sky-700/70 -rotate-45 ${game===games.length-1 ? 'opacity-30' : ''}`
                    }
            ></div>
        </div>
        {scores && (
            <table className='border-collapse border w-[400px] text-center rounded-lg overflow-hidden'>
                <thead>
                    <tr className='font-bold bg-sky-300'>
                        <td>Place</td>
                        <td>Username</td>
                        <td>Time</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, idx) => (
                        <tr key={score.id} className='even:bg-sky-200 odd:bg-sky-100' >
                            <td>{idx+1}</td>
                            <td>{score.username}</td>
                            <td>{score.time}</td>
                            <td>{score.date.toDate().toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default LeaderBoard