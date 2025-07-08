import { addDoc, collection, serverTimestamp, getDocs } from "@firebase/firestore"
import { firestore as db} from "./firebase"
import Score from "./types/Score";

const handleSubmitFb = async(gameId:number, username:string, time:number) => {
    const ref = collection(db, `leaderboard/${gameId}/scores`); // Firebase creates this automatically
    let data = {
        username,
        time,
        date: serverTimestamp()
    }
    
    try {
        await addDoc(ref, data);
    } catch(err) {
        console.log(err)
    }
}

export const handleGetScores = async(gameId:number) => {
    const querySnapshot = await getDocs(collection(db, `leaderboard/${gameId}/scores`));
    const scores: Score[] = [];
    querySnapshot.forEach((doc)=>{
        const score = doc.data();
        score.id = doc.id
        scores.push(score as Score);
    })
    scores.sort((a,b) => (a.time-b.time));
    return scores;
}
export default handleSubmitFb