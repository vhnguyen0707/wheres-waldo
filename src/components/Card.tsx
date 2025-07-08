import GameData from '../types/gameData'
import { Link } from 'react-router-dom';

const Card = ({ game } : { game: GameData}) => {
  return (
    <Link to={`/${game.id}`}>
        <div className='relative rounded-lg overflow-hidden'>
            <img src={game.url} className='aspect-[4/3] object-cover'/>
            <div className='overlay opacity-0 hover:opacity-100 absolute w-full h-full top-0'>
                <div className='absolute bottom-0 w-full text-center pb-2'>
                    <p className='text-white text-lg font-semibold'>{game.title}</p>
                </div>
            </div>
        </div>

    </Link>
  )
}

export default Card