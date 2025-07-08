import { Routes, Route } from "react-router-dom"
import MainLayout from "./MainLayout"
import Homepage from "./pages/Homepage"
import Game from './pages/Game';
import { GameContextProvider } from "./GameContext";
import LeaderBoard from "./pages/LeaderBoard";
function App() {
    return (
        <GameContextProvider>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path={'/:id'} element={<Game />} />
                    <Route path={'/leaderboard'} element={<LeaderBoard />} />
                </Route>
            </Routes>
        </GameContextProvider>
    )
}

export default App
