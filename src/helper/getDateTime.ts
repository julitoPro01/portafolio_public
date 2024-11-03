import { useState } from "react";
interface DateTime {
  hour: string,
  date: string
}

export const getDateTime = () => {

    const [dateTime, setdateTime] = useState<DateTime>({
        hour: new Date().toTimeString().slice(0, 8),
        date: new Date().toDateString()
    });
    
    const setDateTime=()=>{
        const DateTime = new Date();
            const hour = DateTime.toTimeString().slice(0, 8);
            const date = DateTime.toDateString();
            setdateTime({ hour, date })
    }
    
  return{
    setDateTime,
    dateTime
  }
}
