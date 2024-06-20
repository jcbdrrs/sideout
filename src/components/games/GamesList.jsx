import { useState, useEffect } from "react";
import { getAllGames } from "../../services/GamesServices.jsx";
import { useNavigate } from "react-router-dom";
import { Card, CardImg, CardImgOverlay, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';

export const GamesList = ({ currentUser }) => {
  const [gamesList, setGamesList] = useState([]);
  const [, setFilteredGamesList] = useState([]);

  const navigate = useNavigate();
  console.log(currentUser)

  useEffect(() => {
    getAllGames().then((gamesArray) => {
      setGamesList(gamesArray);
    });
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.id && gamesList.length > 0) {
      const gamesForUser = gamesList.filter((game) => game.userId === currentUser.id);
      setFilteredGamesList(gamesForUser);
    }
  }, [currentUser, gamesList]);


  return (

    <>

      {gamesList.map((game) => (
        <section key={game.id}>

          <div className="mt-5"></div>
          className=".px-2"
          
          <Card className="my-2"
            className="text-center">


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
              <button type="button" class="btn btn-light">"SEE YOU ON THE COURT"</button>
            </CardBody>
          </Card>
        </section>
      ))}
    </>
  )
}

