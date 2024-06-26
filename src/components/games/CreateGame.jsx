import "./CreateGame.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Form, Button } from "reactstrap";
import { createNewGame } from "../../services/GamesServices.jsx";
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Col } from 'reactstrap';


export const CreateGame = ({ currentUser }) => {
  const [game, setGame] = useState({
    date: "",
    time: "",
    location: "",
    singlesOrDoublesGame: "",
  });
  const navigate = useNavigate();

  const handleCreateNewGame = (event) => {
    event.preventDefault();
    if (game.time && game.location) {
      const newGame = {
        date: game.date,
        time: game.time,
        location: game.location,
        singlesOrDoublesGame: game.singlesOrDoublesGame,
        userId: currentUser.id
      };

      createNewGame(newGame).then(() => {
        navigate("/games");
      });
    } else {
      window.alert("Please fill out required fields!");
    }
  };

  return <>

    <section className="wrapper-center" key={game.id}>
      <Form>
        <FormGroup row>
          <Label
            for="exampleEmail"
            size="sm"
            sm={2}
          >
            LOCATION:
          </Label>
          <div></div>
          <Col sm={10}>
            <Input
              bsSize="rg"
              id="exampleEmail"
              name="location"
              placeholder="Court Location"
              type="text"
              onChange={(event) => {
                const gameCopy = { ...game };
                gameCopy.location = event.target.value;
                setGame(gameCopy);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="exampleEmail2"
            sm={2}
          >
            DATE:
          </Label>
          <div></div>
          <Col sm={10}>
            <Input
              id="date"
              name="date"
              placeholder="DATE"
              type="text"
              onChange={(event) => {
                const gameCopy = { ...game };
                gameCopy.date = event.target.value;
                setGame(gameCopy);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="exampleEmail2"
            sm={2}
          >
            TIME:
          </Label>
          <div></div>
          <Col sm={10}>
            <Input
              id="exampleEmail2"
              name="time"
              placeholder="3:33 PM"
              type="text"
              onChange={(event) => {
                const gameCopy = { ...game };
                gameCopy.time = event.target.value;
                setGame(gameCopy);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="exampleEmail2"
            sm={2}
          >
            TYPE:
          </Label>
          <div></div>
          <Col sm={10}>
            <Input
              id="exampleEmail2"
              name="type"
              placeholder="Singles or Doubles?"
              type="text"
              onChange={(event) => {
                const gameCopy = { ...game };
                gameCopy.singlesOrDoublesGame = event.target.value;
                setGame(gameCopy);
              }}
            />
          </Col>
        </FormGroup>
        <Button onClick={handleCreateNewGame}>
          CREATE GAME
        </Button>
      </Form>
    </section>
  </>

};
