import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/UserServices.jsx";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        console.log(user)
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="login">
      <Card
        className="my-2 text-center"
        color="light"
        style={{
          width: "50rem",
        }}
      >
        <CardHeader className="p-3">SIDEOUT!</CardHeader>
        <CardBody className="p-4">
          <CardTitle tag="h5">SIGN IN</CardTitle>
          <Form onSubmit={handleLogin}>
            <FormGroup floating>
              <Input
                id="exampleEmail"
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email"
                required
              />

              <Label for="exampleEmail">snakeplissken@gmail.com</Label>
            </FormGroup>
            <Button color="primary" type="submit" >
              LOGIN
            </Button>
          </Form>
          <hr></hr>
          <Link to="/register">REGISTER HERE</Link>
        </CardBody>
      </Card>
    </main>
  );
};
