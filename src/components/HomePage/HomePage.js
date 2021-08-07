import react from "react";
import { useFetch } from "../Api/useFetch";
import { Container, Button } from "react-bootstrap";
import fetcha from "../Api/fetch";
import "./HomePage.css";

const url = "http://localhost:5000/schedule";

const HomePage = () => {
  const { loading, products } = useFetch(url);

  return (
    <Container>
      {/* <div>{loading ? "loading..." : {products.map((item, index) => {
        return (
          <div>{item}</div>
        )
      })}}</div> */}

      {loading
        ? "loading"
        : products.map((item) => {
            return (
              <section>
                <div>{item.title}</div>
                <div>{item.conference}</div>
              </section>
            );
          })}
    </Container>
  );
};

export default HomePage;
