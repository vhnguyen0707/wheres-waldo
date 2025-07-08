import games from '../gameInfo'
import Card from '../components/Card'
import { Link } from 'react-router-dom';
const Homepage = () => {
  return (
    <div className='flex flex-col text-center p-7 gap-6'>
      <div className='flex justify-center items-center gap-2'>
        <h1 className='text-3xl font-["Josefin_sans"]'>Select A Game</h1>
        <Link to={'/leaderboard'} className='p-2 text-sm bg-gradient-to-r from-sky-400 to-indigo-400 text-white font-bold rounded-md'>LEADERBOARD</Link>
      </div>
      <div className='game-cards grid grid-cols-1 xs:grid-cols-2 justify-center items-center gap-5'>
        {games.map(game => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default Homepage