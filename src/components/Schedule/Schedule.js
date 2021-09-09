import react, { useState, useEffect } from "react";
import { Form, FloatingLabel, Card } from "react-bootstrap";
import Clock from "../Clock/Clock";
import convertDate from "../../shared/convertDate";
import displayFrontZeros from "../../shared/displayFrontZeros";
import CurrentTimer from "../../shared/currentTimer";
import "./Schedule.css";

const Schedule = ({ option, products }) => {
  const [days, setDays] = useState([]);
  const [optionDays, setOptionDays] = useState("all");
  const [rooms, setRooms] = useState([]);
  const [optionRooms, setOptionRooms] = useState("all");
  const [newProducts, setNewProducts] = useState([]);
  let noMatchSum = 0;
  let thisDayEventsSum = 0;

  useEffect(() => {
    setNewProducts(products.filter((item) => item.conference === option));
  }, []);

  useEffect(() => {
    sortNewProducts();
  }, [newProducts]);

  useEffect(() => {
    // sortNewProducts();
    updateDays();
    updateRooms();
  });

  useEffect(() => {
    days.sort((a, b) => {
      let aa = a.split("-").reverse().join(),
        bb = b.split("-").reverse().join();
      return aa < bb ? -1 : aa > bb ? 1 : 0;
    });
    // setDays([...days]);
  }, [days]);

  const sortNewProducts = () => {
    // console.log("przed", newProducts);
    newProducts.sort(
      (a, b) =>
        parseInt(a.startingHour) - parseInt(b.startingHour) ||
        parseInt(a.startingMinute) - parseInt(b.startingMinute)
    );

    // newProducts.reverse();
    // console.log("po", newProducts);
  };

  const updateDays = () => {
    // console.log("updateDays()", days);

    newProducts.map(({ day }) => {
      if (!days.includes(day)) {
        setDays([...days, day]);
      }
    });

    setDays((days) =>
      days.sort((a, b) => {
        let aa = a.split("-").reverse().join(),
          bb = b.split("-").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      })
    );

    console.log("days", days);
  };

  const updateRooms = () => {
    // console.log("updateRooms()", rooms);

    newProducts.map(({ room }) => {
      if (!rooms.includes(room)) {
        setRooms([...rooms, room]);
      }
    });
  };

  const handleChangeDays = (e) => {
    setOptionDays(e.target.value);
  };

  const handleChangeRooms = (e) => {
    setOptionRooms(e.target.value);
  };

  const resetNoMatchSum = () => {
    noMatchSum = 0;
  };

  const resetThisDayEventsSum = () => {
    thisDayEventsSum = 0;
  };

  const showNoMatchesMsg = () => {
    // setShowDayTitle(true);
    if (
      noMatchSum === thisDayEventsSum &&
      noMatchSum !== 0 &&
      thisDayEventsSum !== 0
    ) {
      return (
        <div style={{ color: "rgb(150, 150, 150)" }}>
          Brak wydarzeń tego dnia, spłeniających wybrane kryteria
        </div>
      );
      // setShowDayTitle(false);
    }
  };

  return (
    <>
      <section className="schedule">
        <Form className="schedule-form">
          <Form.Group className="schedule-form-group">
            <FloatingLabel controlId="floatingSelect" label="Wybierz dzień">
              <Form.Select
                value={optionDays}
                onChange={(e) => handleChangeDays(e)}
              >
                <option value="all" selected>
                  Wszystkie dni
                </option>
                {days.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="schedule-form-group">
            <FloatingLabel controlId="floatingSelect" label="Wybierz salę">
              <Form.Select
                value={optionRooms}
                onChange={(e) => handleChangeRooms(e)}
              >
                <option value="all" selected>
                  Wszystkie sale
                </option>
                {rooms.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          <Clock />
        </Form>

        {days.map((thisDay, index) => {
          if (thisDay === optionDays || optionDays === "all") {
            return (
              <div key={index} className="day">
                <div className="day-title">{convertDate(thisDay)}</div>
                <div className="day-content">
                  {(resetNoMatchSum(), resetThisDayEventsSum())}
                  {newProducts.map((item, index) => {
                    thisDayEventsSum++;
                    if (
                      item.day === thisDay &&
                      (item.room === optionRooms || optionRooms === "all")
                    ) {
                      return (
                        <div key={index} className="schedule-item">
                          <div className="schedule-item-hour">
                            {parseInt(item.startingHour)}:
                            {displayFrontZeros(parseInt(item.startingMinute))} -{" "}
                            {parseInt(item.endingHour)}:
                            {displayFrontZeros(parseInt(item.endingMinute))}
                            <CurrentTimer
                              day={item.day}
                              startingHour={item.startingHour}
                              startingMinute={item.startingMinute}
                              endingHour={item.endingHour}
                              endingMinute={item.endingMinute}
                              text={false}
                            />
                          </div>
                          <div className="schedule-item-content">
                            <h2>{item.title}</h2>
                            <div>{item.person}</div>
                            <div>Sala: {item.room}</div>
                          </div>
                        </div>
                      );
                    } else {
                      noMatchSum++;
                    }
                  })}
                  {showNoMatchesMsg()}
                </div>
              </div>
            );
          }
        })}
      </section>
    </>
  );
};

export default Schedule;
