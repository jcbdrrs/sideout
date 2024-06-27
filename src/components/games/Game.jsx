import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { getGameBridgeById, handleAcceptGame } from '../../services/GamesServices.jsx';

export const Game = ({ game, currentUser, handleDeleteCreatedNewGame }) => {

  const [gameBridge, setGameBridge] = useState({});
  const [buttonVisible, setButtonVisible] = useState(true); // Added this line
  const [singleGame, setSingleGame] = useState({
    userId: currentUser.id,
    gameId: 0
  });
  const [gameBridge2, setGameBridge2] = useState({});

const getAndSetGameBridge = () => {
    getGameBridgeById(game.id).then((gamesArray) => {
        setGameBridge(gamesArray);
      });
  
}

const joinGame = (gameId) => {
    let gameCopy = { ...singleGame }
    gameCopy.gameId = gameId
    gameCopy.userId = currentUser.id
    return handleAcceptGame(gameCopy)
  }



console.log(game)

  useEffect(() => {
    getAndSetGameBridge()
  }, [game]);

  useEffect(() => {
setGameBridge2(gameBridge)
  },[gameBridge])

  const handleButtonClick = () => {
    joinGame(game.id).then(() => {
        getAndSetGameBridge()
    })
    
  };

  return (
    <section key={game.id}>
      <div className="mt-5"></div>
      <div className="px-2"> 

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
              PLAYERS: {game?.user?.username} vs {gameBridge[0]?.user?.username}
            </CardText>

            {game.userId == currentUser.id ? (
              <Button onClick={() => navigate(`/edit-game/${game.id}`)}>
                Edit
              </Button>
            ) : null}

            {game.userId !== currentUser.id && game.id !== gameBridge[0]?.gameId ? (
              <button type="button" className="btn btn-light" onClick={() => handleButtonClick()}>
                SEE YOU ON THE COURT
              </button>
            ): ""}

            {game.userId == currentUser.id ? (
              <Button onClick={() => handleDeleteCreatedNewGame(game.id)}>
                Delete
              </Button>
            ) : null}
          </CardBody>
        </Card>
      </div>
    </section>
  );
};