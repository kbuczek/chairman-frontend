import React, { useEffect, useState } from "react";

export default function CurrentTimer({
  day,
  startingHour,
  startingMinute,
  endingHour,
  endingMinute,
  text,
}) {
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());

  const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

  useEffect(() => {
    let secTimer = setInterval(() => {
      setMinutes(new Date().getMinutes());
      setHours(new Date().getHours());
    }, 55000);

    return () => clearInterval(secTimer);
  }, []);

  const checkTime = () => {
    let date = new Date();
    let todayDate =
      displayFrontZeros(date.getDate()) +
      "-" +
      displayFrontZeros(date.getMonth() + 1) +
      "-" +
      date.getFullYear();

    if (todayDate === day) {
      let startingTimeMinutes =
        parseInt(startingHour) * 60 + parseInt(startingMinute);
      let endingTimeMinutes =
        parseInt(endingHour) * 60 + parseInt(endingMinute);
      let currentTimeMinutes = hours * 60 + minutes;
      let toEndMinutesLeft = endingTimeMinutes - currentTimeMinutes;
      let interval = endingTimeMinutes - startingTimeMinutes;
      if (toEndMinutesLeft <= interval && toEndMinutesLeft >= 0) {
        //interval to 90?
        return (
          <div
            style={{
              color: "red",
              fontWeight: "600",
              fontSize: "1.5rem",
              marginLeft: "1rem",
            }}
          >
            W TRAKCIE
          </div>
        );
      }
    }
  };

  return <>{checkTime()}</>;
}
