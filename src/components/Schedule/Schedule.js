import react, { useState, useEffect } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import Clock from "../Clock/Clock";
import convertDate from "../../shared/convertDate";
import "./Schedule.css";

const Schedule = ({ option, products }) => {
  const [days, setDays] = useState([]);
  const [optionDays, setOptionDays] = useState("");
  const [rooms, setRooms] = useState([]);
  const [optionRooms, setOptionRooms] = useState("");
  let newProducts = [];

  useEffect(() => {
    console.log("useEffect");
    newProducts = products.filter((item) => item.conference !== option);
    console.log(newProducts);
    console.log("!!!", option);
    console.log("!!!", products);
  }, []);

  const updateDays = () => {
    console.log("updateDays()", days);

    products.map(({ day }) => {
      if (!days.includes(day)) {
        setDays([...days, day]);
      }
    });

    let indices = [6, 7, 8, 9, 3, 4, 0, 1];
    days.sort((a, b) => {
      // let r = 0;
      return indices.find((i) => a.charCodeAt(i) - b.charCodeAt(i));
      // return r;
    });

    console.log(days);
  };

  const updateRooms = () => {
    console.log("updateRooms()", rooms);

    products.map(({ room }) => {
      if (!rooms.includes(room)) {
        setRooms([...rooms, room]);
      }
    });
  };

  return (
    <>
      {updateDays()}
      {updateRooms()}
      <section className="schedule">
        <Form className="schedule-form">
          <Form.Group className="schedule-form-group">
            <FloatingLabel controlId="floatingSelect" label="Wybierz dzień">
              <Form.Select
                value={option}
                onChange={(e) => setOptionDays(e.target.value)}
              >
                <option value="" selected disabled>
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
                value={option}
                onChange={(e) => setOptionDays(e.target.value)}
              >
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

        {days.map((propDays) => {
          return (
            <div className="day">
              <div className="day-title">{convertDate(propDays)}</div>
              <div className="day-content">
                {products.map((item, index) => {
                  if (item.day === propDays) {
                    return (
                      <div key={index} className="schedule-item">
                        <div className="schedule-item-hour">
                          {parseInt(item.startingHour)}:
                          {displayFrontZeros(parseInt(item.startingMinute))} -{" "}
                          {parseInt(item.endingHour)}:
                          {displayFrontZeros(parseInt(item.endingMinute))}
                        </div>
                        <h2>{item.title}</h2>
                        <div>{item.person}</div>
                        <div>Sala: {item.room}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

export default Schedule;
