import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../assets/css/SingInAndRegister.css";
import { useForm } from "react-hook-form";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

function BasicExample() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className="full-page-container">
      <div className="centered-form-container">
        <h1 className="title">Register</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 d-flex">
            <Form.Control type="text" placeholder="First name" className="me-2" {...register("firstName")}/>
            <Form.Control type="text" placeholder="Last name" {...register("lastName")}/>
          </div>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Username" {...register("username")}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email" {...register("email")}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" {...register("password")}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default BasicExample;
