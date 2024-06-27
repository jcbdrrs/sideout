import { useState, useEffect } from "react";
import { deleteGame, getAllBridgeGames, getAllGames } from "../../services/GamesServices.jsx";
import { useNavigate } from "react-router-dom";
import { Game } from "./Game.jsx";




export const GamesList = ({ currentUser }) => {
  const [gamesList, setGamesList] = useState([]);
  const [bridgeGamesList, setBridgeGamesList] = useState([]);


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
       handleDeleteCreatedNewGame={handleDeleteCreatedNewGame}
       currentUser={currentUser}/>
      ))}
      
    </>
  )
}

