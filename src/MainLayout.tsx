import { Outlet, useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect, useContext } from 'react';
import { GameContext } from "./GameContext";

export default function MainLayout(){   
    const { id } = useParams();
    const { setGameOver } = useContext(GameContext);
    useEffect(()=> {
        setGameOver(true)
    },[id])
        
    return (
        <div className='bg-sky-100 min-h-screen'>
            <NavBar />
            <Outlet />
        </div>
    )
}