
import react from "react";

const TimestampToDate = ({date})=> {


const newdate = new Date(date);
const today = new Date();
const timeDiff = Math.abs(today.getTime() - newdate.getTime());
const days = Math.floor(timeDiff / (1000 * 3600 * 24));

  return (
    <>
    Posted {days} days ago
    </>
  )
}

export default TimestampToDate;
