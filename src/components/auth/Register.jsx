import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/UserServices";
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label, } from "reactstrap";

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar: "",
    created_at: "",
    bio: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const currentTime = new Date().toISOString();
    const userWithCreatedAt = { ...user, created_at: currentTime };

    createUser(userWithCreatedAt).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  //   return (
  //     <main>
  //       <form onSubmit={handleRegister}>
  //         <h1>Sonuva Digger</h1>
  //         <h2>Please Register</h2>
  //         <fieldset>
  //           <div>
  //             <input
  //               onChange={updateUser}
  //               type="text"
  //               id="fullName"
  //               placeholder="Enter your name"
  //               required
  //               autoFocus
  //             />
  //           </div>
  //         </fieldset>
  //         <fieldset>
  //           <div>
  //             <input
  //               onChange={updateUser}
  //               type="email"
  //               id="email"
  //               placeholder="Email address"
  //               required
  //             />
  //           </div>
  //         </fieldset>
  //         <fieldset>
  //           <div>
  //             <button type="submit">
  //               Register
  //             </button>
  //           </div>
  //         </fieldset>
  //       </form>
  //     </main>
  //   )
  // }

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
          <CardTitle tag="h5">REGISTER HERE</CardTitle>
          <Form onSubmit={handleRegister}>
            <FormGroup floating>
              <Input
                onChange={updateUser}
                type="text"
                id="username"
                placeholder="Enter your name"
                required
              />
              <Label for="username">Snake Plissken</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                onChange={updateUser}
                type="email"
                id="email"
                placeholder="Email address"
                required
              />{" "}
              <Label for="email">snakeplissken@gmail.com</Label>
            </FormGroup>
            <Button color="primary" type="submit"> 
              LET'S GO!
            </Button>
          </Form>
        </CardBody>
      </Card>
    </main>
  );
};
