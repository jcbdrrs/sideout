import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { getGameBridgeById } from '../../services/GamesServices.jsx';

export const Game = ({ game, currentUser, joinGame, handleDeleteCreatedNewGame }) => {

const [gameBridge, setGameBridge] = useState({})

useEffect(() => {
    getGameBridgeById(game.id).then((gamesArray) => {
      setGameBridge(gamesArray);
    });
  }, []);

    return (

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
                        PLAYERS: {game?.user?.username} vs {gameBridge?.user?.username}
                    </CardText>
                    {game.userId == currentUser.id ? <Button
                        onClick={() => navigate(`/edit-game/${game.id}`)}

                    >
                        Edit
                    </Button> : ""}
                    {game.userId == currentUser.id ? "" :
                        <button type="button" class="btn btn-light" onClick={() => joinGame(game.id)}>"SEE YOU ON THE COURT"</button>
                        // <-------- click event for adding player to game

                    }


                    {game.userId == currentUser.id ? <Button
                        onClick={() => handleDeleteCreatedNewGame(game.id)}

                    >
                        Delete
                    </Button> : ""}
                </CardBody>
            </Card>
        </section>

    )
}