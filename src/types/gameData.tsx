type GameData = {
    id: number;
    title: string;
    url: string;
    details: {
        id: number;
        name: string;
        url: string;
        marker: {
            x: number;
            y: number;
        };
        coords: {
            x: number;
            y: number;
        }
    }[]; 
}

export default GameData;