import { useState, useEffect } from "react";
import { deleteGame, getAllBridgeGames, getAllGames, handleAcceptGame } from "../../services/GamesServices.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardImg, CardImgOverlay, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import { getUserById } from "../../services/UserServices.jsx";
import { EditGame } from "./editGame.jsx";
import { Game } from "./Game.jsx";



export const GamesList = ({ currentUser }) => {
  const [gamesList, setGamesList] = useState([]);
  const [bridgeGamesList, setBridgeGamesList] = useState([]);
  const [, setFilteredGamesList] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const [singleGame, setSingleGame] = useState({
    userId: currentUser.id,
    gameId: 0
  });


  const joinGame = (gameId) => {
    let gameCopy = { ...singleGame }
    gameCopy.gameId = gameId
    gameCopy.userId = currentUser.id
    handleAcceptGame(gameCopy)
  }



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

  useEffect(() => {
    getAllBridgeGames().then((gamesArray) => {
      setBridgeGamesList(gamesArray);
    });
  }, []);




  return (
    <>
      {gamesList.map((game) => (
       <Game key={game.id}
       game={game}
       joinGame={joinGame}
       handleDeleteCreatedNewGame={handleDeleteCreatedNewGame}
       currentUser={currentUser}/>
      ))}
      
    </>
  )
}

