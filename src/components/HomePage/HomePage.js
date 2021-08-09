import react, { useState, useEffect } from "react";
import { useFetch } from "../Api/useFetch";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./HomePage.css";
import Schedule from "../Schedule/Schedule";

const url = "http://localhost:5000/schedule";

const HomePage = () => {
  const { loading, products } = useFetch(url);
  const [show, setShow] = useState(true);
  const [conferences, setConferences] = useState([]);
  const [option, setOption] = useState("");

  const addConferences = () => {
    products.map((item) => {
      if (!conferences.includes(item.conference)) {
        setConferences([...conferences, item.conference]);
      }
    });
  };

  // useEffect(() => {
  //   addConferences();
  // }, [products]);

  const handleSubmit = (e) => {
    setShow(false);
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          {addConferences()}
          {show ? (
            <div className="content">
              <h1 className="hp-title">Wybierz konferencję</h1>
              <Form className="hp-form">
                <Form.Select
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                >
                  {conferences.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="primary"
                  className="btn-submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Wybierz
                </Button>
              </Form>
            </div>
          ) : (
            <>
              <Button variant="link" onClick={() => setShow(true)}>
                Powrót do wyboru konferencji
              </Button>
              <h1 className="title">Harmonogram konferencji {option}</h1>
              <Schedule option={option} products={products} />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
