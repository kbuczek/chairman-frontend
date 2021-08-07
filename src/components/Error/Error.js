import react from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Error = () => {
  return (
    <Container>
      <div>"Page not found"</div>
      <Link to="/">
        <Button>Back home</Button>
      </Link>
    </Container>
  );
};

export default Error;
