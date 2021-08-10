import react, { useState, useEffect } from "react";
import convertDate from "../../shared/convertDate";
import displayFrontZeros from "../../shared/displayFrontZeros";
import "./Clock.css";

const Clock = () => {
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());

  let date = new Date();
  let todayDate =
    displayFrontZeros(date.getDate()) +
    "-" +
    displayFrontZeros(date.getMonth() + 1) +
    "-" +
    date.getFullYear();

  useEffect(() => {
    let secTimer = setInterval(() => {
      setSeconds(new Date().getSeconds());
      setMinutes(new Date().getMinutes());
      setHours(new Date().getHours());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);
  return (
    <div className="clock">
      <span className="clock-date">{convertDate(todayDate)}</span>
      <span className="clock-time">
        {hours}:{displayFrontZeros(minutes)}:{displayFrontZeros(seconds)}
      </span>
    </div>
  );
};

export default Clock;
