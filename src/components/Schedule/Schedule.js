import react, { useState, useEffect } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import "./Schedule.css";

const Schedule = ({ option, products }) => {
  const [days, setDays] = useState([]);
  const [optionDays, setOptionDays] = useState("");

  useEffect(() => {
    // products.filter;
    console.log("!!!", option);
  }, []);

  return (
    <>
      <section className="schedule">
        <Form className="schedule-form">
          <Form.Group className="schedule-form-group">
            <FloatingLabel controlId="floatingSelect" label="Wybierz dzień">
              <Form.Select
                value={option}
                onChange={(e) => setOptionDays(e.target.value)}
              >
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
                {days.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Form>

        {products.map((item, index) => {
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
        })}
      </section>
    </>
  );
};

const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

export default Schedule;
