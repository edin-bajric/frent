import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../assets/css/SingInAndRegister.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

type SignInFormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup.string().min(8, "Password must be at least 8 characters.").required()
}).required();

function BasicExample() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <div className="full-page-container">
      <div className="centered-form-container">
        <h1 className="title">Sign in</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email" {...register("email")}/>
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" {...register("password")}/>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
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
