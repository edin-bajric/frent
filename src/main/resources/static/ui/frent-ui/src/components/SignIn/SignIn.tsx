import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../assets/css/SingInAndRegister.css";

function BasicExample() {
  return (
    <div className="full-page-container">
      <div className="centered-form-container">
        <h1 className="title">Sign in</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default BasicExample;
