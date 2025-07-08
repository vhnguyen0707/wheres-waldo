import {useEffect} from 'react'

type MessageProps = {
    message: string ;
    setMessage: (message:string) => void;
}
const Message = ({message, setMessage}:MessageProps) => {
  useEffect(() => {
    const timerId = setTimeout(()=>setMessage(''), 2000);
    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className="fixed left-1/2 top-[125px] translate-x-[-50%] translate-y-[-50%] bg-black/50 text-white px-3 py-2 animate-fade-in">{message}</div>
  )
}

export default Message;
