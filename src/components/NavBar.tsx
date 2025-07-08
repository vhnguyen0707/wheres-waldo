import Wally from '../assets/wally.png';
import Timer from './Timer';
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GameContext } from '../GameContext';
import useTimer from '../useTimer';

const NavBar = () => {
  const { id } = useParams();
  const { game, gameOver, setGameOver, foundDetails } = useContext(GameContext);
  const { reset } = useTimer();

  return (
    <div className='sticky z-20 top-0 w-full px-6 py-4 flex flex-col xs:flex-row justify-between items-center 
        bg-sky-200 shadow-md shadow-slate-400 gap-3'>
        <a className="logo flex items-center" href="/">
            <img src={Wally} alt="Wally Logo" className='w-20'/>
            <h1 className='navbar-text'>Where's <span className='navbar-text whitespace-nowrap'>Waldo? <i className="fa-solid fa-location-dot"></i></span></h1>
        </a>
        <div className='flex gap-3 flex-col xs:flex-row items-center'>
          {id && gameOver && (
            <button
              onClick={() => {setGameOver(false); reset()}}
              className='bg-sky-400 px-2 text-white font-semibold rounded-md'>Start game</button>
          )}
           {id && !gameOver && (
            <div className='details -my-3 flex gap-5 justify-around items-center bg-slate-400/60 p-2 rounded-lg'>
            {
              game?.details.map(detail =>(
                <div key={detail.id} className='detail relative'>
                  <img src={detail.url} className='w-14 h-14 object-cover rounded-md'/>
                  <div className={`
                    tooltip
                    opacity-0
                    rounded-md
                    absolute
                    whitespace-nowrap
                    bg-slate-600/70
                    text-white
                    px-1
                    ${foundDetails.includes(detail.id) ? 'line-through' : ''}
                  `}
                  >{detail.name}</div>
                </div>
              ))
            }</div>
           )  }
           
          <Timer />
        </div>
    </div>
  )
}

export default NavBar