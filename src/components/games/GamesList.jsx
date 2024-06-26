import { useState, useEffect } from "react";
import { deleteGame, getAllGames } from "../../services/GamesServices.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardImg, CardImgOverlay, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import { getUserById } from "../../services/UserServices.jsx";
import { EditGame } from "./editGame.jsx";



export const GamesList = ({ currentUser }) => {
  const [gamesList, setGamesList] = useState([]);
  const [, setFilteredGamesList] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();


  console.log(currentUser)


 const handleDeleteCreatedNewGame = (gameId) => {
    deleteGame(gameId).then(() => {
      getAllGames().then((gamesArray) => {
        setGamesList(gamesArray);
      });
    });
  };


  useEffect(() => {
    getAllGames().then((gamesArray) => {
      setGamesList(gamesArray);
    });
  }, []);

  

  return (

    <>

      {gamesList.map((game) => (
        <section key={game.id}>

          <div className="mt-5"></div>
          className=".px-2"

          <Card className="my-2 text-center">


            <CardBody>
              <CardTitle tag="h3">
                {game.location}
              </CardTitle>
              <CardText>
                WHEN: {game.date} @ {game.time}
              </CardText>
              <CardText>
                SINGLES|DOUBLES: {game.singlesOrDoublesGame ? "Singles" : "Doubles"}
              </CardText>
              <CardText>
                PLAYERS: `{game.userId}`
              </CardText>
              { game.userId == currentUser.id ? <Button
                onClick={() => navigate (`/edit-game/${game.id}`)}
                
              >
                Edit
              </Button> : ""}
              { game.userId == currentUser.id ? "": 
                <button type="button" class="btn btn-light" onClick={() => handleDeleteCreatedNewGame(game.id)}>"SEE YOU ON THE COURT"</button>
                 // <-------- click event for adding player to game
             
              }

              
              { game.userId == currentUser.id ? <Button
                onClick={() => handleDeleteCreatedNewGame(game.id)}
                
              >
                Delete
              </Button> : ""}
            </CardBody>
          </Card>
        </section>
      ))}
    </>
  )
}

