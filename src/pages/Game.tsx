import GameData from "../types/gameData"
import { useRef, useState, useEffect, useContext, SyntheticEvent, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import games from "../gameInfo";
import { GameContext } from "../GameContext";
import DetailsList from "../components/DetailsList";
import { Position } from "../types/Position";
import { NaturalDimensions, ClientDimensions } from "../types/dimensions";
import Marker from "../components/Marker";
import Message from "../components/Message";
import WinModal from "../components/WinModal";


const TARGET_BOX_RADIUS = 75/2;
const DETAILS_WIDTH = 150;
const DETAILS_HEIGHT = 180;
const DETAILS_ITEM_HEIGHT = 60;

type coords = {
    x: number;
    y: number;
}
const Game = () => {
    const { id } = useParams(); 
    const imgRef = useRef(null);
    const { game, setGame, foundDetails, gameOver, setGameOver } = useContext(GameContext);
    const [naturalDimensions, setNaturalDimensions] = useState<NaturalDimensions>({
        naturalWidth: 0,
        naturalHeight: 0
    })
    const [clientDimensions, setClientDimensions] = useState<ClientDimensions>({
        width: 0,
        height: 0
    })
    const [openTargetBox, setOpenTargetBox] = useState<boolean>(false);
    const [detailsListPosition, setDetailsListPosition] = useState<Position>({
        right: '-150px' 
    })
    const [coords, setCoords] = useState<coords>({x: 0, y: 0});
    const [message, setMessage] = useState('');
    const [openWinModal, setOpenWinModal] = useState(false);

    useEffect(() => {
        setGame(games.find(game=>game.id.toString()===id) as GameData)
    }, [id])
    
    useEffect(() => {
        const handleResize = () => {
            setOpenTargetBox(false);
            if (imgRef.current == null) return;
            const { clientWidth:width, clientHeight:height } = imgRef.current;
            setClientDimensions({width, height});
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const detail = game?.details.find(detail=>detail.id===foundDetails[foundDetails.length-1]);
        if (detail) setMessage(`You just found ${detail.name}`)
        if (foundDetails.length===game?.details.length) {
            setGameOver(true);
            setOpenWinModal(true);
        }
    }, [foundDetails]);

    if (!game) return <div>Loading ...</div>

    const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        setNaturalDimensions({
            naturalHeight: e.currentTarget.naturalHeight,
            naturalWidth: e.currentTarget.naturalWidth
        })

        setClientDimensions({
            width: e.currentTarget.clientWidth,
            height: e.currentTarget.clientHeight
        })
    }

    const getDetailsPosition = (coordX: number, coordY: number) => {
        // check if clicked close to boundary
        const widthDiff = Math.abs(coordX - clientDimensions.width);
        const heightDiff = Math.abs(coordY - clientDimensions.height);
        const detailsRight = TARGET_BOX_RADIUS + DETAILS_WIDTH;
        const detailsBottom = TARGET_BOX_RADIUS + DETAILS_HEIGHT;
        const height = DETAILS_ITEM_HEIGHT * (game?.details?.length-foundDetails?.length);

        const  isCloseToRightBoundary = widthDiff < detailsRight;
        const isCloseToBottomBoundary = heightDiff < detailsBottom;
        const isCloseToTopBoundary = coordY < 35;

        const position: Position = {};
        // const defaultPos = {right: '-150px'};
        if (isCloseToBottomBoundary) position.top = `-${height}px`;
        if (isCloseToTopBoundary) position.bottom = `-${height}px`;
        if (isCloseToRightBoundary) position.left = `-${DETAILS_WIDTH}px`;
        else position.right = `-${DETAILS_WIDTH}px`;
        return position;
    }
    const handleImageClick = (e: MouseEvent<HTMLImageElement>) =>{
        if (!gameOver) {
            console.log(e.currentTarget);
            const rect = e.currentTarget.getBoundingClientRect();
            console.log(rect, e.clientX, e.clientY);
            const coordX = e.clientX - rect.left;
            const coordY = e.clientY - rect.top;
            setCoords({x: coordX, y: coordY});
            setOpenTargetBox(prev => {
                const newState = !prev;
                if (newState) setDetailsListPosition(getDetailsPosition(coordX, coordY));
                return newState
            })
        } else {
            setMessage('Please click on Start game button/resume the timer')
        }
        
    }


    return (
        <div className="cursor-crosshair relative overflow-hidden justify-center">
            {/* <WinModal setOpenWinModal={setOpenWinModal}/> */}
            {gameOver && openWinModal && <WinModal setOpenWinModal={setOpenWinModal}/>}
            {message && <Message message={message} setMessage={setMessage} />}
            {foundDetails.map((itemId) => {
                const detail = game.details.find(item=>item.id===itemId);
                if (!detail) return;
                return <div key={itemId} >
                        <Marker 
                            coords={detail.coords}
                            naturalDimensions={naturalDimensions}
                            imgDimensions={clientDimensions}
                        />
                    </div>
            })}
            <img 
                src={game.url} 
                alt={game.title} 
                ref={imgRef}
                className="game-bg"
                onLoad={handleImageLoad}
                onClick={handleImageClick}
            />
            {openTargetBox && (
                <div 
                    style={{left: coords.x, top: coords.y}}
                    className={`
                        absolute z-10
                        -translate-x-1/2 -translate-y-1/2
                        w-[75px] h-[75px] rounded-full
                        border-slate-100 border-dashed border-2
                        bg-black/40`}
                >
                    <div
                        className="absolute w-2 h-2 bg-red-700 top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2"
                    ></div>
                    {/* <div
                        className="w-20 h-20 bg-black/50 absolute"
                    ></div> */}
                    <DetailsList 
                        position={detailsListPosition}
                        coords={coords}
                        imgDimensions={clientDimensions}
                        naturalDimensions={naturalDimensions}
                        setOpenTargetBox={setOpenTargetBox}
                    />
                </div>
            )}
        </div>
  )
}

export default Game