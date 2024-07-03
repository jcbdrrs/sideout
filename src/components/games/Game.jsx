import { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'; // Importing UI components from Reactstrap
import { getGameBridgeById, getGameBridgeByUserId, handleAcceptGame, leaveGame } from '../../services/GamesServices.jsx'; // Importing functions to handle game data
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and navigation hook from React Router
import "./Game.css"


export const Game = ({ game, currentUser, handleDeleteCreatedNewGame }) => {
  // State to store the list of players in the game
  const [gameBridge, setGameBridge] = useState([]);

  // State to store the current game details for the current user
  const [singleGame, setSingleGame] = useState({
    userId: currentUser.id,
    gameId: 0
  });

  // State to store the list of games the current user is part of
  const [userGameBridge, setUserGameBridge] = useState([]);

  // State to store the specific game the user wants to leave
  const [userGameBridgeToDelete, setUserGameBridgeToDelete] = useState({});

  // State to trigger re-renders when a game is updated
  const [isGameUpdated, setIsGameUpdated] = useState(false);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to get and set the list of players for the current game
  const getAndSetGameBridge = () => {
    getGameBridgeById(game.id).then((gamesArray) => {
      setGameBridge(gamesArray); // Update state with the list of players
    });
  };

  // Function to handle joining a game
  const joinGame = (gameId) => {
    let gameCopy = { ...singleGame }; // Create a copy of singleGame state
    gameCopy.gameId = gameId; // Set the gameId to the current game's id
    gameCopy.userId = currentUser.id; // Set the userId to the current user's id
    return handleAcceptGame(gameCopy); // Call the service function to accept the game
  };

  // Effect to get and set the game bridge data when the component mounts or game/isGameUpdated changes
  useEffect(() => {
    getAndSetGameBridge();
  }, [game, isGameUpdated]);

  // Effect to get and set the user's game bridge data when the component mounts or game/isGameUpdated changes
  useEffect(() => {
    getGameBridgeByUserId(currentUser.id).then((gameBridgeArray) => {
      setUserGameBridge(gameBridgeArray); // Update state with the user's game bridges
    });
  }, [game, isGameUpdated]);

  // Effect to find and set the game bridge to delete when the user's game bridge data changes
  useEffect(() => {
    const foundGameBridge = userGameBridge.find((foundUserGameBridge) => foundUserGameBridge.gameId === game?.id);
    setUserGameBridgeToDelete(foundGameBridge); // Update state with the game bridge to delete
  }, [userGameBridge]);

  // Function to handle the join game button click
  const handleButtonClick = () => {
    joinGame(game.id).then(() => {
      setIsGameUpdated(!isGameUpdated); // Toggle isGameUpdated to trigger a re-render
    });
  };

  // Function to handle the leave game button click
  const handleLeaveGameButtonClick = () => {
    leaveGame(userGameBridgeToDelete.id).then(() => {
      setIsGameUpdated(!isGameUpdated); // Toggle isGameUpdated to trigger a re-render
    });
  };

  return (

    <section className="card-wrapped-center" key={game.id}>
      <div className="mt-5"></div>
      <div className="gamecard">
        <Card className="my-2 text-center" color="00FFFFFF">
          <CardBody>
            <CardTitle tag="h3">
              <strong>{game.location}</strong>
            </CardTitle>
            <CardText>
              <strong>WHEN:</strong> {game.date} @ {game.time}
            </CardText>
            <CardText>
              <strong>SINGLES|DOUBLES:</strong>
              <div>{game.singlesOrDoublesGame}</div>
            </CardText>
            <CardText>
              <div><strong>PLAYERS:</strong></div>
              <Link to={`/profile/${game?.user?.id}`}> {game?.user?.username}  </Link>
              {gameBridge.map((bridge, index) => (
                <div key={index}>
                  <Link to={`/profile/${bridge.user?.id}`}>{bridge.user?.username}</Link>
                </div>
              ))}
            </CardText>

            {/* Show Edit button if the current user created the game */}
            {game.userId === currentUser.id ? (
              <Button onClick={() => navigate(`/edit-game/${game.id}`)}>
                Edit
              </Button>
            ) : null}

            {/* Show Join Singles Game button if the game is singles and the current user is not already in the game */}
            {game.userId !== currentUser.id && game.singlesOrDoublesGame.toLowerCase() === "singles" && game.id !== gameBridge[0]?.gameId ? (
              <button type="button" className="btn btn-light" color="primary" onClick={handleButtonClick}>
                JOIN SINGLES GAME
              </button>
            ) : ""}

            {/* Show Join Doubles Game button if the game is doubles, has less than 4 players, and the current user is not already in the game */}
            {game.userId !== currentUser.id && currentUser.id !== gameBridge[gameBridge.length - 1]?.userId && game.singlesOrDoublesGame.toLowerCase() === "doubles" && gameBridge.length < 3 ? (
              <button type="button" className="btn btn-light" color="primary" onClick={handleButtonClick}>
                JOIN DOUBLES GAME
              </button>
            ) : ""}



            {/* Show Leave Game button if the current user is already in the game */}
            {game.userId !== currentUser.id && currentUser.id === gameBridge[0]?.userId || currentUser.id === gameBridge[1]?.userId || currentUser.id === gameBridge[2]?.userId ? (
              <button type="button" className="btn btn-light" color="primary" onClick={handleLeaveGameButtonClick}>
                LEAVE GAME
              </button>
            ) : ""}

            {/* Show Delete button if the current user created the game */}
            {game.userId === currentUser.id ? (
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

// Explanation:
// Imports: Import necessary functions and components from various libraries.
// States: Use state hooks to manage data.
// gameBridge: List of players in the game.
// singleGame: Details of the current game the user might join.
// userGameBridge: List of games the current user is part of.
// userGameBridgeToDelete: The game the user wants to leave.
// isGameUpdated: Triggers updates and re-renders.
// Functions:
// getAndSetGameBridge: Fetches and sets the game bridge data.
// joinGame: Handles joining a game.
// handleButtonClick: Joins a game and updates the state.
// handleLeaveGameButtonClick: Leaves a game and updates the state.
// useEffect Hooks: Manage side effects.
// Fetch and set data when the component mounts or dependencies change.
// Return Statement: Render the UI.
// Display game details, players, and buttons for various actions based on conditions.

