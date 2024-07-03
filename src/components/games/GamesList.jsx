import { useState, useEffect } from "react"; // Import React hooks: useState and useEffect
import { deleteGame, getAllBridgeGames, getAllGames } from "../../services/GamesServices.jsx"; // Import functions to interact with the game services
import { Game } from "./Game.jsx"; // Import the Game component
import "./GamesList.css"

// Define the GamesList component, which takes currentUser as a prop
export const GamesList = ({ currentUser }) => {
  // State to store the list of all games
  const [gamesList, setGamesList] = useState([]);
  // State to store the list of bridge games
  const [bridgeGamesList, setBridgeGamesList] = useState([]);


  // Log the current user to the console (for debugging purposes)



  // Function to handle the deletion of a game
  const handleDeleteCreatedNewGame = (gameId) => {
    // Delete the game with the given gameId
    deleteGame(gameId).then(() => {
      // After deletion, fetch all games again
      getAllGames().then((gamesArray) => {
        // Sort the fetched games by date and time, and update the state
        setGamesList(sortGamesByDateTime(gamesArray));
      });
    });
  };


  // Function to sort games by date and time
  const sortGamesByDateTime = (gamesArray) => {
    return gamesArray.sort((a, b) => {
      // Convert the date of game 'a' to a timestamp (milliseconds since epoch)
      const dateA = new Date(a.date).getTime();
      // Convert the date of game 'b' to a timestamp (milliseconds since epoch)
      const dateB = new Date(b.date).getTime();
      // If dates are the same, compare times
      if (dateA === dateB) {
        // Split the time string into hours, minutes, and seconds and convert to numbers
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        // Compare the hours, then minutes, then seconds
        return (timeA[0] - timeB[0]) || (timeA[1] - timeB[1]) || (timeA[2] - timeB[2]);
      }
      // If dates are different, compare the dates
      return dateA - dateB;
    });
  };


  // useEffect to fetch all games when the component mounts
  useEffect(() => {
    getAllGames().then((gamesArray) => {
      // Sort the fetched games by date and time, and update the state
      setGamesList(sortGamesByDateTime(gamesArray));
    });


  }, []); // Empty dependency array means this effect runs once when the component mounts


  // useEffect to fetch all bridge games when the component mounts
  useEffect(() => {
    getAllBridgeGames().then((gamesArray) => {
      // Sort the fetched bridge games by date and time, and update the state
      setBridgeGamesList(sortGamesByDateTime(gamesArray));
    });


  }, []); // Empty dependency array means this effect runs once when the component mounts


  return (
    <>
      {/* Map through the sorted games list and render a Game component for each game */}
      {gamesList.map((game) => (
        <Game
          key={game.id} // Unique key for each game component
          game={game} // Pass the game data to the Game component
          handleDeleteCreatedNewGame={handleDeleteCreatedNewGame} // Pass the delete function to the Game component
          currentUser={currentUser} // Pass the current user to the Game component
        />
      ))}
    </>
  );
};



//---------------------------------------------------------------------------

// Explanation of Each Step:

// Import Statements:

// useState and useEffect are React hooks.
// deleteGame, getAllBridgeGames, and getAllGames are functions to interact with the game services.
// Game is a component that displays individual game details.

// State Variables:

// gamesList stores the list of all games.
// bridgeGamesList stores the list of bridge games.

// Logging the Current User:

// Logs the currentUser to the console for debugging purposes.

// handleDeleteCreatedNewGame Function:

// Deletes a game by its ID and then fetches and updates the games list.

// sortGamesByDateTime Function:

// Sorts an array of games by date and time.
// Converts dates to timestamps for comparison.
// Splits time strings into hours, minutes, and seconds and compares them sequentially.

// useEffect for Fetching All Games:

// Fetches all games when the component mounts.
// Sorts the games by date and time and updates the state.

// useEffect for Fetching Bridge Games:

// Fetches bridge games when the component mounts.
// Sorts the bridge games by date and time and updates the state.

// Rendering the Games:

// Maps through the sorted games list and renders a Game component for each game.
// Passes necessary props (game, handleDeleteCreatedNewGame, and currentUser) to each Game component.