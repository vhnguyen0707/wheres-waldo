import { useState, FormEvent, useContext } from 'react'
import { GameContext } from '../GameContext';
import { useNavigate } from 'react-router-dom';
import handleSubmitFb from '../handleFirebase';

type WinModalProps = {
    setOpenWinModal: (state: boolean) => void;
}
const WinModal = ({ setOpenWinModal }: WinModalProps) => {
    const { timePlayed, game } = useContext(GameContext);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username')?.toString();
        if (game && username) await handleSubmitFb(game?.id, username, timePlayed);
        setOpenWinModal(false);
        navigate('/leaderboard');

    }

  return (
    <div id="overlay" className='cursor-pointer absolute w-full h-full bg-black/40 font-semibold' 
        onClick={(e)=>{
            if ((e.target as HTMLDivElement).id === 'overlay') //inline type assertion: we have info about the type that TS doesn't
                setOpenWinModal(false)}
        }>
        <div 
            className={`
                fixed z-50 modal w-96 h-72 bg-sky-200 
                rounded-md top-[300px] left-1/2 -translate-x-1/2 
                flex flex-col items-center py-[35px] gap-10
                
            `}
        >
            <p className='text-2xl'>You finished in {timePlayed} seconds!</p>
            <form className='flex flex-col gap-2 items-start' onSubmit={handleSubmit}>
                <label htmlFor="username" className='block text-2xl'>Username</label>
                <input 
                    className='rounded-2xl leading-8 px-2 py-1 font-medium'
                    type="text" 
                    id="username" 
                    name="username"
                    // value={username} 
                    // onChange={e=>setUsername(e.target.value)} 
                />
                <button className='bg-sky-300 mx-auto p-1 px-3 rounded-xl mt-2'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default WinModal