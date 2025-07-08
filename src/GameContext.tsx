import { createContext, useState,  useEffect, useMemo } from 'react';
import GameData from './types/gameData';

type GameContextType = {
    game: GameData | null;
    setGame: (game: GameData) => void;
    gameOver: boolean;
    setGameOver: (gameOver: boolean) => void; 
    foundDetails: Array<number>;
    setFoundDetails: (details: Array<number>) => void;
    timePlayed: number;
    setTimePlayed: (time: number) => void
}
export const GameContext = createContext<GameContextType>({} as GameContextType);

export function GameContextProvider({ children } : { children: React.ReactNode }) {
    const [game, setGame] = useState<GameData | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(true);
    const [foundDetails, setFoundDetails] = useState<Array<number>>([]); 
    const [timePlayed,  setTimePlayed] = useState<number>(0);

    useEffect(()=>{
        if (gameOver) setFoundDetails([]);
        if (!gameOver) setTimePlayed(0);
    }, [gameOver]);
    const value = useMemo(() => ({
            game,
            setGame,
            gameOver, 
            setGameOver,
            foundDetails, 
            setFoundDetails,
            timePlayed,
            setTimePlayed
        }), [game, setGame, gameOver, setGameOver, foundDetails, setFoundDetails, timePlayed, setTimePlayed])
    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

