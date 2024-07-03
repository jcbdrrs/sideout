import { useEffect, useState } from "react"; // Importing necessary hooks from React
import { useNavigate, useParams } from "react-router-dom"; // Importing navigation and parameter hooks from React Router
import { getGameById, updateGame } from "../../services/GamesServices.jsx"; // Importing service functions to get and update game data
import { Card } from "reactstrap"; // Importing Card component from Reactstrap for UI
import "./editGame.css"; // Importing CSS for styling

export const EditGame = ({ currentUser }) => {
    const [myGame, setMyGame] = useState({}); // State to store the game details to be edited
    const { gameId } = useParams(); // Hook to get the gameId from the URL parameters

    // Effect to fetch game details when the component mounts or when gameId changes
    useEffect(() => {
        getGameById(gameId).then((data) => {
            const gameObj = data; // Store the fetched game data
            console.log(data);
            setMyGame(gameObj); // Update state with the fetched game data
        });
    }, [gameId]);

    const navigate = useNavigate(); // Hook to navigate to different routes

    // Function to handle saving the edited game
    const handleSave = (game) => {
        game.preventDefault(); // Prevent the default form submission behavior
        const editedGame = {
            location: myGame.location, // Use the edited location
            id: gameId, // Use the gameId from the URL parameters
            date: myGame.date, // Use the edited date
            time: myGame.time, // Use the edited time
            singlesOrDoublesGame: myGame.singlesOrDoublesGame, // Use the edited game type
            userId: currentUser.id // Use the current user's id
        };
        updateGame(editedGame).then(() => {
            navigate("/games"); // Navigate to the games page after updating
        });
    };

    return (
        <div className="wrapper-center">
            <form>
                <Card style={{ width: '35rem' }}>
                    <div>
                        <h4>Edit Game</h4> {/* Heading for the form */}
                    </div>
                    <fieldset>
                        <div className="form-title">
                        </div>
                    </fieldset>

                    <div><strong>LOCATION:</strong></div> {/* Label for location field */}

                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                className="form-control"
                                placeholder={myGame.location} // Placeholder showing the current location
                                onChange={(game) => {
                                    const gameCopy = { ...myGame }; // Create a copy of the current game state
                                    gameCopy.location = game.target.value; // Update location in the copied state
                                    setMyGame(gameCopy); // Set the updated state
                                }}
                            ></input>
                        </div>
                    </fieldset>

                    <div><strong>DATE:</strong></div> {/* Label for date field */}

                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                className="form-control"
                                placeholder={myGame.date} // Placeholder showing the current date
                                onChange={(game) => {
                                    const gameCopy = { ...myGame }; // Create a copy of the current game state
                                    gameCopy.date = game.target.value; // Update date in the copied state
                                    setMyGame(gameCopy); // Set the updated state
                                }}
                            ></input>
                        </div>
                    </fieldset>

                    <div><strong>TIME:</strong></div> {/* Label for time field */}

                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                className="form-control"
                                placeholder={myGame.time} // Placeholder showing the current time
                                onChange={(game) => {
                                    const gameCopy = { ...myGame }; // Create a copy of the current game state
                                    gameCopy.time = game.target.value; // Update time in the copied state
                                    setMyGame(gameCopy); // Set the updated state
                                }}
                            ></input>
                        </div>
                    </fieldset>

                    <div><strong>SINGLES | DOUBLES:</strong></div> {/* Label for singles/doubles field */}

                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                className="form-control"
                                placeholder={myGame.singlesOrDoublesGame} // Placeholder showing the current game type
                                onChange={(game) => {
                                    const gameCopy = { ...myGame }; // Create a copy of the current game state
                                    gameCopy.singlesOrDoublesGame = game.target.value; // Update game type in the copied state
                                    setMyGame(gameCopy); // Set the updated state
                                }}
                            ></input>
                        </div>
                    </fieldset>

                    <fieldset className="form-group">
                        <button className="form-btn" btn-info onClick={handleSave}>
                            Save Game {/* Button to save the edited game */}
                        </button>
                    </fieldset>
                </Card>
            </form>
        </div>
    );
};


// Explanation:
// Imports: Import necessary functions, components, and CSS.
// States: Use state hooks to manage game data.
// myGame: Stores the details of the game to be edited.
// useParams Hook: Get the gameId from the URL.
// useEffect Hook: Fetch game data when the component mounts or when gameId changes.
// Functions:
// handleSave: Handles form submission to save the edited game and navigate to the games page.
// Return Statement: Render the form for editing the game.
// Display fields for location, date, time, and game type with placeholders showing current values and onChange handlers to update the state.