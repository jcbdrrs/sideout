import { useState } from "react";
import { getAllGames } from "../../services/GamesServices.jsx";
import { createGame } from "src/services/GamesServices.jsx";
import { useNavigate } from "react-router-dom";
import "src/components/games/CreateGame.css"




export const CreateGame = ({ currentUser }) => {

    const [createGame, setCreateGame] = useState({
        name: "",
        eventDate: "",
        location: ""
    });

    const navigate = useNavigate();

    const handleSave = (saveGame) => {
        saveGame.gameDefault();

        const gameToDatabase = {
            name: createGame.name,
            userId: currentUser.id,
            gameDate: createGame.gameDate,
            location: createGame.location
        }

        CreateGame(gameToDatabase).then(() => {
            navigate("/games");

        })

    }

    return <>
  <p>
    Wrap a pair of{' '}
    <code>
      {`<Input>`}
    </code>
    {' '}and{' '}
    <code>
      {`<Label>`}
    </code>
    {' '}components in{' '}
    <code>
      {`<FormGroup floating>`}
    </code>
    {' '}to enable floating labels with Bootstrap’s textual form fields. A{' '}
    <code>
      placeholder
    </code>
    {' '}is required on each{' '}
    <code>
      {`<Input>`}
    </code>
    {' '}as our method of CSS-only floating labels uses the{' '}
    <code>
      :placeholder-shown
    </code>
    {' '}pseudo-element. Also note that the{' '}
    <code>
      {`<Input>`}
    </code>
    {' '}must come first so we can utilize a sibling selector (e.g.,{' '}
    <code>
      ~
    </code>
    ).
  </p>
  <Form>
    <FormGroup floating>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button>
      Submit
    </Button>
  </Form>
</>
}