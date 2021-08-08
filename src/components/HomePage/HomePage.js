import react, { useState, useEffect } from "react";
import { useFetch } from "../Api/useFetch";
import { Container, Button, Form } from "react-bootstrap";
import Loading from "../Loading/Loading";
import "./HomePage.css";

const url = "http://localhost:5000/schedule";

const HomePage = () => {
  const { loading, products } = useFetch(url);
  const [conferences, setConferences] = useState([]);

  useEffect(() => {});

  const handleSubmit = (e) => {
    e.preventDefualt();
    console.log("print");
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>Wybierz konferencję</h1>
          <Form onSubmit={handleSubmit} className="hp-form">
            <Form.Select aria-label="Default select example">
              <option>...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default HomePage;
