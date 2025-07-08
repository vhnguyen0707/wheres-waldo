import { Timestamp } from 'firebase/firestore';

type Score = {
    id: string,
    username: string;
    time: number;
    date: Timestamp

}

export default Score;