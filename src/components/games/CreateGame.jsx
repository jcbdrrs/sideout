import "./CreateGame.css"; // Importing CSS for styling
import { useState } from "react"; // Importing useState hook from React
import { useNavigate } from "react-router-dom"; // Importing navigation hook from React Router
import { FormGroup, Input, Label, Form, Button } from "reactstrap"; // Importing Form components from Reactstrap for UI
import { createNewGame } from "../../services/GamesServices.jsx"; // Importing the service function to create a new game
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Col } from 'reactstrap'; // Importing additional components from Reactstrap

export const CreateGame = ({ currentUser }) => {
  const [game, setGame] = useState({
    date: "", // State to store the date of the new game
    time: "", // State to store the time of the new game
    location: "", // State to store the location of the new game
    singlesOrDoublesGame: "", // State to store whether the game is singles or doubles
  });
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to handle the creation of a new game
  const handleCreateNewGame = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (game.time && game.location) { // Check if the time and location fields are filled out
      const newGame = {
        date: game.date, // Use the date from the state
        time: game.time, // Use the time from the state
        location: game.location, // Use the location from the state
        singlesOrDoublesGame: game.singlesOrDoublesGame, // Use the game type from the state
        userId: currentUser.id // Use the current user's id
      };

      createNewGame(newGame).then(() => {
        navigate("/games"); // Navigate to the games page after creating the new game
      });
    } else {
      window.alert("Please fill out required fields!"); // Show an alert if required fields are not filled out
    }
  };

  return (
    <>
      <section className="wrapper-center" key={game.id}>
        <Form>
          <FormGroup row>
            <Label for="exampleEmail" size="sm" sm={2}>
              LOCATION: {/* Label for location field */}
            </Label>
            <div></div>
            <Col sm={10}>
              <Input
                bsSize="rg"
                id="exampleEmail"
                name="location"
                placeholder="Court Location" // Placeholder text for the location input
                type="text"
                onChange={(event) => {
                  const gameCopy = { ...game }; // Create a copy of the current game state
                  gameCopy.location = event.target.value; // Update location in the copied state
                  setGame(gameCopy); // Set the updated state
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail2" sm={2}>
              DATE: {/* Label for date field */}
            </Label>
            <div></div>
            <Col sm={10}>
              <Input
                id="date"
                name="date"
                placeholder="DATE" // Placeholder text for the date input
                type="text"
                onChange={(event) => {
                  const gameCopy = { ...game }; // Create a copy of the current game state
                  gameCopy.date = event.target.value; // Update date in the copied state
                  setGame(gameCopy); // Set the updated state
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail2" sm={2}>
              TIME: {/* Label for time field */}
            </Label>
            <div></div>
            <Col sm={10}>
              <Input
                id="exampleEmail2"
                name="time"
                placeholder="3:33 PM" // Placeholder text for the time input
                type="text"
                onChange={(event) => {
                  const gameCopy = { ...game }; // Create a copy of the current game state
                  gameCopy.time = event.target.value; // Update time in the copied state
                  setGame(gameCopy); // Set the updated state
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail2" sm={2}>
              TYPE: {/* Label for singles/doubles field */}
            </Label>
            <div></div>
            <Col sm={10}>
              <Input
                id="exampleEmail2"
                name="type"
                placeholder="Singles or Doubles?" // Placeholder text for the game type input
                type="text"
                onChange={(event) => {
                  const gameCopy = { ...game }; // Create a copy of the current game state
                  gameCopy.singlesOrDoublesGame = event.target.value; // Update game type in the copied state
                  setGame(gameCopy); // Set the updated state
                }}
              />
            </Col>
          </FormGroup>
          <Button onClick={handleCreateNewGame}>
            CREATE GAME {/* Button to create a new game */}
          </Button>
        </Form>
      </section>
    </>
  );
};
