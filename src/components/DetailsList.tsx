import { useContext } from 'react'
import { Position } from '../types/Position'
import { GameContext } from '../GameContext'
import { NaturalDimensions, ClientDimensions } from '../types/dimensions'

type DetailsListProps = {
    position: Position;
    coords: {x: number, y: number};
    imgDimensions: ClientDimensions;
    naturalDimensions: NaturalDimensions;
    setOpenTargetBox: (cb: (prev:boolean) => boolean) => void;
}
const DetailsList = ({position, coords, imgDimensions, naturalDimensions, setOpenTargetBox}:DetailsListProps) => {
    const { game, foundDetails, setFoundDetails } = useContext(GameContext);
    
    // coord relative to real image
  
    const coordX = () => {
        console.log(Math.round((coords.x /imgDimensions.width)*100*100)/100);
        return Math.round((coords.x / imgDimensions.width) * naturalDimensions.naturalWidth);
    }
      
    const coordY = () => {
        console.log(Math.round((coords.y /imgDimensions.height)*100*100)/100);
        return Math.round((coords.y / imgDimensions.height) * naturalDimensions.naturalHeight);
    }
    
    const verifyDetail = (coord: number, srcCoord: number) => {
        return Math.abs(coord-srcCoord) <= 70;
    } 
    const handleClick = (detail:any) => {
        console.log(coordX(), coordY());
        const found = verifyDetail(coordX(), detail.coords.x) && verifyDetail(coordY(), detail.coords.y);
        if (found) setFoundDetails([...foundDetails, detail.id]);
        console.log(found);
        setOpenTargetBox((prev: boolean) => !prev);
    }


    return (
        <ul 
            style={position}
            className={`w-[150px] bg-black/80 absolute rounded-lg animate-fade-in`}>
            {game?.details.map(detail => {
                if (foundDetails.includes(detail.id)) return;
                return(
                    <li key={detail.id} 
                        className='h-[60px] grow text-white flex justify-around items-center hover:bg-slate-400 cursor-pointer transition duration-300 ease-in-out'
                        onClick={()=>handleClick(detail)}
                    >
                        <img src={detail.url} alt={detail.name} className='w-12 h-12 rounded-md'/>
                        <span className='font-semibold'>{detail.name}</span>
                    </li>
                )
        })}
        </ul>
  )
}

export default DetailsList